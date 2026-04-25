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
let light = 50;

// canvas.addEventListener('click', (event) => {
//   mouse.x = event.x;
//   mouse.y = event.y;
//   for (let i = 0; i < 10; i++) {
//     particles.push(new Particle())
//   }
// }
// )
canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 2; i++) {
    particles.push(new Particle())
  }
})


class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.color = `hsl(${hue}, ${sat}%, ${light}%)`;
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 10 - 1.5
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

  }
}

function adjustColor() {
  hue = (hue + 1) % 360
}

function updateEnvironment() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  adjustColor()
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].size <= 1 || particles[i].x < 0 || particles[i].y < 0) {
      particles.splice(i, 1);
      console.log(particles.length)
      i--;
      continue
    }
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y

      const distance = Math.sqrt(dx * dx + dy * dy);
      console.log(distance)
      if (distance <= 100) {
        ctx.beginPath();
        ctx.strokeStyle = particles[i].color;
        ctx.moveTo(particles[i].x, particles[i].y)

        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

function animate() {
  updateEnvironment()
  handleParticles()
  requestAnimationFrame(animate);
}

animate();
