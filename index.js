let mouse = {
    x: undefined,
    y: undefined,
}



const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let overCanvas = false;

let canGo = true;
canvas.onmouseenter = function(){
    overCanvas = true;
}
canvas.onmouseleave = function(){
    overCanvas = false;
}
canvas.onclick = function(){
    overCanvas = true;
    if(canGo === true){   
        for(let each of circles){
            each.blastOff();
        }
        canGo = false;
        setTimeout(function(){
            canGo = true;
        }, 600);
    }
}
canvas.onmousemove = function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
}

let c = canvas.getContext('2d');
const speed = .08;
const bigCircle = 30;
const spaceBetween = 80;

let red = 'red';
let gray = 'gray';
let purple = 'purple';
let gravity = .4;
let colorList = [red, gray, purple];

//circles
class Circle {
    constructor(x, y, rad, dx, dy) {
        let r = (Math.random() * 255);
        let g = (Math.random() * 255);
        let b = (Math.random() * 255);
        this.x = x;
        this.y = y;
        this.origRad = rad;
        this.rad = rad;
        this.dx = dx;
        this.dy = dy;
        this.Odx = dx;
        this.Ody = dy;
//        this.color = `rgba(${r}, ${g}, ${b}, .5)`;
        this.color= "white";
        this.fillColor = colorList[Math.floor(Math.random() * colorList.length)];
        this.gravity = gravity;

    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.fillColor;
        c.fill();
    }
    grow() {
        let xDist = this.x - mouse.x;
        let yDist = this.y - mouse.y;
        if (Math.abs(mouse.x - this.x) <= spaceBetween && Math.abs(mouse.y - this.y) <= spaceBetween) {
                        if (this.rad < bigCircle) {
                            this.rad += 5;
                        }
                        } else {
                            if (this.rad >= this.origRad) {
                                this.rad -= 1;
                            }
        }
    }
    blastOff(){
        this.dx = this.dx * 20;
        this.dy = this.dy * 20;
    }
    attract() {
        if (Math.abs(mouse.x - this.x) <= spaceBetween && Math.abs(mouse.y - this.y) <= spaceBetween) {
            let xDist = this.x - mouse.x;
            let yDist = this.y - mouse.y;
            this.x -= xDist * .01;
            this.y -= yDist * .01;
        }

    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.rad > canvas.width || this.x - this.rad < 0) {
            this.dx = -this.dx;

        } else if (this.y + this.rad > canvas.height || this.y - this.rad < 0) {
            this.dy = -this.dy
        }
        
        if(Math.abs(this.dy) > Math.abs((this.Ody))){
            if(this.dy < 0){
                this.dy += this.gravity;
            }else{
                this.dy -= this.gravity;
            }
        }   
        
        if(Math.abs(this.dx) > Math.abs((this.Odx))){
            if(this.dx < 0){
                this.dx += gravity;
            }else{
                this.dx -= gravity;
            }
        }
        this.draw();
        
        if(overCanvas === true){
            
        this.attract();
        this.grow();
        }

    }
}

class Line {
    constructor(x, y) {
        let r = (Math.random() * 255);
        let g = (Math.random() * 255);
        let b = (Math.random() * 255);
        this.x = x;
        this.y = y;
        this.color = `rgba(${r}, ${g}, ${b}, .5)`

    }
    draw() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x * 80, this.y);
        c.strokeStyle = this.color;
        c.stroke();
    }
    update() {
        this.y += speed * .3;
        if (this.y > canvas.height) {
            this.y = 0;
        }
        this.draw();
    }
}

class Rectangle {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {

        if (this.y > canvas.height) {
            this.y = -this.h;
        }
        this.draw();
    }
}


let y;
let x;
let dx;
let dy;

let lines = new Array();
for (let i = 0; i < 87; i++) {
    x = (Math.random() * canvas.width);
    y = (Math.random() * canvas.height);
    let line = new Line(x, y);
    lines.push(line);
}

let circles = [];
let blast = false;
for (let i = 0; i < 500; i++) {
    let rad = (Math.random() * 10) + 1;
    x = (Math.random() * (canvas.width - rad * 2) + (rad));
    y = (Math.random() * (canvas.height - rad * 2) + (rad));
//    x = rad;
//    y = rad + 10;


    dx = (Math.random() * (speed * 2)) - speed;
    dy = (Math.random() * (speed * 2)) - speed;
    let circle = new Circle(x, y, rad, dx, dy);
    circles.push(circle);
}

let rectangles = new Array();
let rect = new Rectangle(200, 200, 100, 300, "rgba(0, 255, 255, .5)");
rectangles.push(rect);

rect = new Rectangle(50, 50, 100, 90, "rgba(0, 255, 0, .5)");

rectangles.push(rect);

rect = new Rectangle(40, 200, 90, 90, "rgba(255, 0, 255, .5)")

rectangles.push(rect);

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);



    //lines
    c.beginPath();
    c.moveTo(50, 600);
    c.lineTo(200, 580);
    c.lineTo(400, 650);
    c.lineTo(500, 300);
    c.strokeStyle = 'red';
    c.stroke();

    c.beginPath();
    c.moveTo(500, 500);
    c.lineTo(280, 170);

    c.strokeStyle = "rgba(0, 255, 255, .9)";
    c.stroke();

    for (let each of lines) {
        each.update();
    }

    for (let each of rectangles) {
        each.update();
    }

    for (let each of circles) {
        if(blast === true){
            each.blastOff();
        }
        each.update();
    }

    blast = false;
    window.requestAnimationFrame(animate);
}

animate();
