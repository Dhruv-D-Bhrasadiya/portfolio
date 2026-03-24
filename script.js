// Initialize icons
lucide.createIcons();

// --- 1. Reveal Animation on Scroll ---
const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: unobserve after revealing if you only want it to happen once
            // scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// --- 2. Canvas Neural Network Background ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;

function resizeCanvas() {
    // Fill window
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
        // Cyan and purple mix
        const colors = ['rgba(0, 243, 255, 0.6)', 'rgba(176, 38, 255, 0.6)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Init particles
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

// Draw connections
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DISTANCE) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                
                // Calculate opacity based on distance
                const opacity = 1 - (dist / CONNECTION_DISTANCE);
                ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();

    requestAnimationFrame(animate);
}

// Start animation
animate();

// --- 3. Dynamic header blur on scroll ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 5, 8, 0.9)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(5, 5, 8, 0.5)';
        header.style.boxShadow = 'none';
    }
});