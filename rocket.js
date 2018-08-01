const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth * .7;

//COLORS/////////////////////
let orange = [255, 139, 12];
let brick = [232, 82, 21];
let red = [255, 22, 7];
let whitesmoke = [200, 200, 200];
let black = [50,50,50];


let flameColors = [orange, brick, red, black];

//////////////////////////////////

let Rocket = new Image();
Rocket.src = './rocket.svg';

Rocket.scale = .7;
Rocket.height = Rocket.height * Rocket.scale;
Rocket.width = Rocket.width * Rocket.scale;

let speed = 4;
let tilt;
let x = (canvas.width / 2) - (Rocket.width / 2);
let y = (canvas.height) - (Rocket.height) - 200;
let dx = 1;
let dxx = -.01;
let origX = Math.floor((canvas.width / 2) - (Rocket.width / 2));

function moveRocket() {

    dx += dxx;
    x += dx;
    if (Math.floor(x) === origX - 1 && canswitch === true) {
        dxx = -dxx;
        canswitch = false;
        setTimeout(function () {
            canswitch = true;
        }, 100)
    }

    c.drawImage(Rocket, x, y, Rocket.width, Rocket.height);
}



let canswitch = true;


//STARS/////////////////////////
class Star {
    constructor(y) {
        this.speed = .2;
        this.x = Math.random() * canvas.width;
        this.y = y;
        this.r = (Math.random() * 2);
        this.dy = this.speed * this.r;
        this.dx = 0;
        this.color = 'rgba(255,249,216,1)';
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.y += this.dy;
        this.draw();
    }
}
let stars = new Array;
for (let i = 0; i < 30; i++) {
    let star = new Star(Math.random() * canvas.height);
    stars.push(star);
}

function makeStars() {
    let n = Math.random() * 100;
    if (n < 1) {
        let star = new Star(-5);
        stars.push(star);
    }
    for (let each of stars) {
        each.update();
        if (each.y + this.r + 10 > canvas.height) {
            each = null;
        }
    }
}
////////////////////////////////////


//FLAMES//////////////////////////
class Flame {
    constructor(x, y) {
        this.x = x;
        this.dx = (Math.random() * 2) - 1
        this.y = y;
        this.dy = 15;
        this.r = 0;
        this.dr = 4;
        this.o = .6; //opacity
        this.oc = .05; //opacity change rate
        let i = Math.floor(Math.random() * (flameColors.length));
        this.color = flameColors[i];
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.o})`;
        c.fill();
    }
    update(){
        this.o += this.oc;
        if(this.o >= 1){
            this.oc = -.07;  
        };
        this.y += this.dy;
        this.x += this.dx;
        this.r += this.dr;
        
        this.draw();
    }
}

let flames = new Array;

function makeFlames(){
    let n = Math.random() * 100;
    if(n < 100){
        
    let flame = new Flame(x + (Rocket.width / 2), y + (Rocket.height - 40));
    flames.push(flame);
    }
    
    for(let each of flames){
        each.update();
        if(each.o < 0){
            each = null;
        }
    }
}
////////////////////////////////////

canvas.style.backgroundColor = 'rgba(8,8,8,1)';




function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);


    makeStars();
    makeFlames(); 
    moveRocket();
    if(send === false){
        c.clearRect(0, 0, canvas.width, canvas.height);
        return null;
    }
    window.requestAnimationFrame(animate);

}

let send = false;
document.querySelector('button').onclick = function(){
    send = !send;
    animate();
}