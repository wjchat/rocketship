let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let opacity = ".5"
let red = `rgba(255, 0, 0, ${opacity})`;
let orange = `rgba(255, 255, 0, ${opacity})`;
let teal = `rgba(255, 0, 255, ${opacity})`;
let green = `rgba(0, 255, 0, ${opacity})`;
let blue = `rgba(0, 0, 255, ${opacity})`;
let purple = `rgba(0, 0, 255, ${opacity})`;

let circles = new Array();
let colors = [red, orange, teal, green, blue, purple];

let mouse = {
    x: undefined,
    y: undefined,
}

window.onmousemove = function(e){
    mouse.x = e.x;
    mouse.y = e.y;
}

let canClick = true;
window.onclick = function (e) {
    if (canClick === true) {
        circles = makeCircles(mouse.x, mouse.y);
        bubbleBurst();
        canClick = false;
    }
}

class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.maxR = Math.random() * 30 + 10;
        this.drr = .1;
        this.dr = Math.random() + .05;
        this.dy = (Math.random() * -3) - 1;
        this.dx = (Math.random() * 5) - 2.5
        this.growing = true;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke(); 
        c.fillStyle = this.color;
        c.fill();
    }

    puffOut() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.growing === true) {
            this.r += this.dr;
            this.dr += this.drr;

            if (this.r >= this.maxR) {
                this.growing = false;
            }
        } else {
            this.r -= 1;
            this.dr += this.drr;

            if (this.r <= 0) {
                this.r = 0;
            }
        }

        this.draw();
    } 
}

function makeCircles(x, y) {

    let circles = new Array();
    for (i = 0; i < 50; i++) {
        let circle = new Circle(x, y);
        circles.push(circle);
    }
    return (circles);
}

let count;
function bubbleBurst() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    count = 0;
    for (let each of circles) {
        each.puffOut();
        if (each.r === 0) { 
            count += 1;
            if (count === circles.length) {
                canClick = true;
                return null;
            }
        }

    }

    window.requestAnimationFrame(bubbleBurst);
}
