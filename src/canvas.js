import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let gravity = 0.2;
let friction = 0.6;

// values
let ballCount = 200;

const ballInput = document.getElementById("ballCount");
const ballnumber = document.querySelector('.ballnumber');
ballnumber.innerHTML = `Ball Count: ${ballCount}`;


ballInput.addEventListener('mousemove', (event) => {
    ballCount = event.target.valueAsNumber;

    ballnumber.innerHTML = `Ball Count: ${ballCount}`;
});

// Event Listeners
window.addEventListener('click', () => {
    init();
})

window.addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

window.addEventListener('resize', () => {

    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;

        this.y += this.dy;
        this.draw();
    }
}


// Implementation
let ball;
let ballArray = [];

function init() {
    ballArray = [];

    for (let i = 0; i < ballCount; i++) {
        let radius = utils.randomIntFromRange(8, 20);

        let x = utils.randomIntFromRange(radius, canvas.width - radius);
        let y = utils.randomIntFromRange(radius, canvas.height - radius);

        let dx = utils.randomIntFromRange(-2, 2);
        let dy = utils.randomIntFromRange(-2, 2);

        ball = new Ball(x, y, dx, dy, radius, utils.randomColor(colors));

        ballArray.push(ball)
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    ballArray.forEach(ball => {
        ball.update();
    })
}

init()
animate()
