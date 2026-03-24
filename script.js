// Initialize Lucide Icons
lucide.createIcons();

// --- 1. Reveal Animation on Scroll ---
const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// --- 2. Theme Toggle (Light / Dark) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
rootElement.setAttribute('data-theme', currentTheme);

themeToggleBtn.addEventListener('click', () => {
    const newTheme = rootElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// --- 3. Subtle Dark Mode Particle Background ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
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
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
        ctx.closePath();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // Only animate if dark mode is active to save resources
    if (rootElement.getAttribute('data-theme') === 'dark') {
        particles.forEach(p => {
            p.update();
            p.draw();
        });
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();