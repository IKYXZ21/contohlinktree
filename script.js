// Loading Screen
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 2000); // 2 detik loading
});

// Show Testimoni Section
function showTestimoni() {
    document.getElementById("testimoni").style.display = "block";
    document.getElementById("testimoni").scrollIntoView({ behavior: "smooth" });
}

// Carousel Testimoni
let currentIndex = 0;
const slides = document.querySelectorAll(".testimoni-item");
const totalSlides = slides.length;

function moveCarousel(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    document.querySelector(".carousel-inner").style.transform = `translateX(${offset}%)`;
}

// Auto-slide carousel
setInterval(() => {
    moveCarousel(1);
}, 3000);

// Back to Top Button
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
