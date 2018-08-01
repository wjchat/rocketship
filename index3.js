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

let colors = [red, orange, teal, green, blue, purple];

let mouse = {
    x: undefined,
    y: undefined,
}

class Circle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.growing = true;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.fillStyle = color;
        c.fill();
    }


    growShrink() {
        if (this.growing === true) {
            this.r += 10;

            if (this.r >= canvas.height) {
                this.growing = false;
            }

        } else {
            this.r -= 10;

            if (this.r <= 0) {
                this.r = 0;
            }
        }
        this.draw();

    }
}

let circles = new Array();
let circle;
let color = "rgba(0,0,0,.5)"
window.onmousemove = function (e) {
    mouse.x = e.x;
    mouse.y = e.y;

    circle = new Circle(mouse.x, mouse.y, color);
    circles.push(circle);
}


let r;
let g;
let b;

window.onclick = function(){
    r = Math.random()* 255;
    g = Math.random()* 255;
    b = Math.random()* 255;
    color = `rgba(${r}, ${g}, ${b}, ${opacity})`

}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);


    for (let each of circles) {
        each.growShrink();

        if (each.growing === false && each.r === 0) {
            each = undefined;
        }
    }

    window.requestAnimationFrame(animate);
}

animate();
