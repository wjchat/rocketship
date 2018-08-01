const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth * .7;


canvas.style.backgroundColor = 'black';
//COLORS/////////////////////
let blue = [80, 143, 255];
let turqoise = [55, 215, 232];
let lightgreen = [74, 255, 167];
let green = [71, 232, 55];
let grassgreen = [218, 255, 61];
let red = [204,1,6];


let flameColors = [blue, red,turqoise, lightgreen, green, grassgreen];

//////////////////////////////////
class Circles {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.dy = (Math.random() * -8) + 1;
        this.dyy = .1;
        this.dx = (Math.random() * 8) - 4;
        this.r = 3;
        this.o = 1;
        this.do = .005;
        this.doo = .0001;
        this.color = color; 
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.o})`;
        c.fill();
    }
    update() {
        this.y += this.dy;
        this.x += this.dx;
        this.dy += this.dyy;
        this.o -= this.do;
        this.do += this.doo;
        this.draw();

    }
}

class Mortar {
    constructor() {
        this.x = ((Math.random() * 200) - 100) + (canvas.width / 2);
        this.y = canvas.height - 5;
        this.dy = Math.floor((Math.random() * -4) - 6);
        this.dyy = .1;
        this.dx = (Math.random() * 2) - 1;
        this.r = 2;
        this.color = 'white';
        this.exploded = 'once';
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        //this.y + this.r >= canvas.height + this.r + 1
        if (this.dy > 0 && this.dy > -.3) {
            this.dy = -6.8;
            this.r = 0;

            if (this.exploded === "once") {
                explode(this.x, this.y);
                this.exploded = "twice";

            } else if (this.exploded === 'twice') {
                this.dy = 1;
            }
        }

        this.y += this.dy;
        this.dy += this.dyy;
        this.x += this.dx;

        this.draw();
    }
}

let fireworks = new Array;
let secondary = new Array;
let aThing = new Circles(100);
let first = new Mortar;
fireworks.push(first);

function explode(x, y) {
    let i = Math.floor(Math.random() * (flameColors.length));
    let theColor = flameColors[i];
    for (let i = 0; i < 70; i++) {
        let thing = new Circles(x, y, theColor);
        secondary.push(thing);
    }
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let each of fireworks) {
        each.update();
        if (each.y > canvas.height + 10) {
            each = null;
            fireworks.splice(each);
        }
    }


    for (let ting of secondary) {
        ting.update();
        if(ting.o === 0){
            ting = null;
            secondary.splice(ting); 
        }
    }
    window.requestAnimationFrame(animate);
}

animate();


document.querySelector('button').onclick = function () {
    let mortar = new Mortar;
    fireworks.push(mortar);
}
setInterval(function(){
    let mortar = new Mortar;
    fireworks.push(mortar);
}, 1000); 