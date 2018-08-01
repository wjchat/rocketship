let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const spaceBetween = 20;
const bigCircle = 15;
let canAttract = false;
let finished = false;
const body = document.querySelector('body');
const intro = document.querySelector('.intro');
const first = document.querySelector('.first');

let mouse = {
    x: undefined,
    y: undefined,
}




class Circle {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.dx = (Math.random() * .5) - .25;
        this.dy = (Math.random() * .5) - .25;
        this.r = r;
        this.dr = 10;
        this.origRad = r;
        this.color = color;
        this.xpos;
        this.ypos;
        this.hypo;
        this.angle;
        this.special === false;

    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    }
    takeOver() {
        if (this.r <= canvas.width) {
            this.r += this.dr;
            this.dr *= 1.3;
        }else{
            finished = true;
        }

        this.draw();
    }
    attract() {
        let xDist = this.x - mouse.x;
        let yDist = this.y - mouse.y;
        this.hypo = Math.hypot(mouse.x - this.x, mouse.y - this.y);

        if (this.hypo < spaceBetween) {
            this.x -= xDist * .01;
            this.y -= yDist * .01;
        }
    }
    grow() {
        let xDist = this.x - mouse.x;
        let yDist = this.y - mouse.y;
        if (Math.abs(mouse.x - this.x) <= spaceBetween && Math.abs(mouse.y - this.y) <= spaceBetween) {
            if (this.r < bigCircle) {
                this.r += 1;
            }
        } else {
            if (this.r >= this.origRad) {
                this.r -= .3;
            }
        }
    }
    update() {

        this.xpos = Math.abs(this.x - outline.x) + this.r;
        this.ypos = Math.abs(this.y - outline.y) + this.r;
        this.hypo = Math.hypot(this.xpos, this.ypos);


        if (this.hypo >= outline.r) {
            this.dx = -this.dx;
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
        this.grow();

    }

}


let outline = new Circle(canvas.width / 2, canvas.height / 2, canvas.height * .2, "white");

let circles = new Array();
let x;
let y;
let r;
let color = 'rgba(25, 25, 25, 1)';
let circle;

for (let i = 0; i < 500; i++) {
    r = (Math.random() * 5) + 1;

    x = outline.x + ((Math.random() * ((outline.r * 1.2) - r)) - ((outline.r - 2) / 2));
    y = outline.y + ((Math.random() * ((outline.r * 1.2) - r)) - ((outline.r - 2) / 2));


    circle = new Circle(x, y, r, color);
    circles.push(circle);

}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    outline.draw();

    for (let each of circles) {


        if (each.special === true) {
            each.takeOver();
            intro.classList.add('go-away');
            if(finished === true){
                body.style.backgroundColor = color;
                first.classList.remove('go-away');
                return null;              
            }
        }       
        else {
            each.update();
        }
    }

    window.requestAnimationFrame(animate);

}

animate();

window.onmousemove = function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    if (Math.hypot(mouse.x - outline.x, mouse.y - outline.y) <= outline.r) {
        canAttract = true;
    } else {
        canAttract = false;
    }
}
let canSpecial = true;
window.onclick = function (e) {
    if (canSpecial === true && canAttract === true) {
        let specialCircle = new Circle(e.x, e.y, 0, color);
        specialCircle.special = true;
        circles.push(specialCircle);
        canSpecial = false;
    }

}
