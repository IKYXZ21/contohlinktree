document.addEventListener("DOMContentLoaded", () => {
    // Loading screen timeout
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 2000); // 2 detik loading
});

// Show Testimoni Section
function showTestimoni() {
    let testiSection = document.getElementById("testimoni");
    testiSection.style.display = "block";
    testiSection.scrollIntoView({ behavior: "smooth" });
}

// === Generate Testimoni (Auto) ===
const testimoniData = [];
for (let i = 1; i <= 19; i++) {
    testimoniData.push({
        img: `testi${i}.jpg`,
        text: `"TESTIMONI ${i} - ZAMZ STORE"`
    });
}

const carouselInner = document.querySelector(".carousel-inner");

// Cek apakah `carouselInner` ada di HTML
if (carouselInner) {
    testimoniData.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("testimoni-item");
        div.innerHTML = `
            <h3>TESTIMONI ${index + 1}</h3>
            <img src="${item.img}" alt="Testimoni ${index + 1}">
            <p>${item.text}</p>
        `;
        carouselInner.appendChild(div);
    });

    // === Carousel Navigasi ===
    let index = 0;
    let autoSlide;
    const slides = document.querySelectorAll(".testimoni-item");
    const totalSlides = slides.length;

    function moveCarousel(step) {
        index += step;
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        let offset = -index * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    // Auto-slide setiap 3 detik
    function startAutoSlide() {
        autoSlide = setInterval(() => moveCarousel(1), 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    startAutoSlide();

    // Pause auto-slide saat hover
    carouselInner.addEventListener("mouseenter", stopAutoSlide);
    carouselInner.addEventListener("mouseleave", startAutoSlide);
}

// === Back to Top Button ===
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
