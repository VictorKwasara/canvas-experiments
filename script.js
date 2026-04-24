const canvas = document.getElementById('canvas1')

const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = []
window.addEventListener('resize', function () {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

})

const mouse = {
  x: undefined,
  y: undefined,
}

let hue = 0;
let sat = 100;
let light = 45;

canvas.addEventListener('click', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle())
  }
}
)
canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle())
  }
})


class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.01;
  }

  draw() {
    ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

  }
}

function adjustColor() {
  hue = (hue + 1) % 360
  sat = Math.floor(Math.random() * 100 + 1)
}

function updateEnvironment() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  adjustColor()
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function handleParticles() {
  for (let particle of particles) {

    particle.update();
    particle.draw();
    if (particle.size <= 0.3) {
      let i = particles.indexOf(particle)

      particles.splice(i, 1);
    }
  }
}

function animate() {
  updateEnvironment()
  handleParticles()
  requestAnimationFrame(animate);
}

animate();
