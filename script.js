// Daftar karakter dan kekuatan
const characters = [
    { name: "Naruto", power: "Mengendalikan chakra dan memanggil Kurama", image: "https://via.placeholder.com/150" },
    { name: "Sasuke", power: "Sharingan dan Amaterasu", image: "https://via.placeholder.com/150" },
    { name: "Saitama", power: "Pukulan satu kali KO", image: "https://via.placeholder.com/150" },
    { name: "Goku", power: "Transformasi Super Saiyan dan Kamehameha", image: "https://via.placeholder.com/150" },
    { name: "Ambatukam", power: "Memanipulasi mimpi musuh", image: "https://via.placeholder.com/150" },
    { name: "Ronaldo", power: "Tendangan akurat 100%", image: "https://via.placeholder.com/150" },
    { name: "Messi", power: "Dribble tak terhentikan", image: "https://via.placeholder.com/150" },
    { name: "Neymar", power: "Kecepatan dan trik bola", image: "https://via.placeholder.com/150" },
    { name: "Hacker", power: "Meretas sistem dalam hitungan detik", image: "https://via.placeholder.com/150" },
    { name: "Alok", power: "Menyembuhkan tim dengan musik", image: "https://via.placeholder.com/150" },
    { name: "Suki Baik", power: "Menyebarkan aura positif yang bikin musuh menyerah", image: "https://via.placeholder.com/150" },
    { name: "Suki Liar", power: "Mengendalikan elemen liar (api, angin, petir)", image: "https://via.placeholder.com/150" }
];

// Flipcard logic
const flipCard = document.getElementById('flipCard');
const characterImage = document.getElementById('characterImage');
const characterName = document.getElementById('characterName');
const characterPower = document.getElementById('characterPower');

flipCard.addEventListener('click', () => {
    // Pilih karakter random
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    
    // Update konten kartu
    characterImage.src = randomCharacter.image;
    characterName.textContent = randomCharacter.name;
    characterPower.textContent = `Kekuatan: ${randomCharacter.power}`;
    
    // Flip kartu
    flipCard.classList.toggle('flipped');
});

// Ambil data real-life
// Device
const deviceInfo = document.getElementById('deviceInfo');
const userAgent = navigator.userAgent;
let device = "Unknown";
if (/Android/i.test(userAgent)) device = "Android";
else if (/iPhone|iPad|iPod/i.test(userAgent)) device = "iPhone/iPad";
else if (/Windows|Mac|Linux/i.test(userAgent)) device = "Desktop";
deviceInfo.textContent = device;

// Lokasi
const locationInfo = document.getElementById('locationInfo');
fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        const region = data.region || "Unknown";
        const country = data.country_code || "Unknown";
        locationInfo.textContent = `${region} (${country})`;
    })
    .catch(() => {
        locationInfo.textContent = "Kalimantan Selatan (ID)"; // Dummy data kalo API gagal
    });

// Efek partikel pake Canvas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 500;
        this.size = Math.random() * 5 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.speedZ = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z += this.speedZ;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        if (this.z < 0 || this.z > 500) this.speedZ *= -1;

        const perspective = 500 / (500 - this.z);
        this.size = perspective * 5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 105, 180, ${1 - this.z / 500})`;
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});