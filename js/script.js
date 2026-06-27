// ===============================
// VARIÁVEIS GLOBAIS
// ===============================
let currentPage = 0;
let pages = [];



// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    initBook();
    initMenu();
    initGallery();
    initTitleAnimation();
});
// ===============================
// 📖 LIVRO
// ===============================
function initBook() {
    pages = document.querySelectorAll(".page");
    showPage(currentPage);
}

function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.remove("active");
        if (i === index) page.classList.add("active");
    });
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}


// ===============================
// 📱 MENU
// ===============================
function initMenu() {
    const menuItems = document.querySelectorAll('.sidebar-nav ul li');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.sidebar-nav ul')?.classList.remove('show');
        });
    });
}

function toggleMenu() {
    document.querySelector('.sidebar-nav ul')?.classList.toggle('show');
}

// ===============================
// 🖼️ GALERIA PROFISSIONAL (PDF STYLE)
// ===============================
function initGallery() {

    const mainImage = document.getElementById("currentImage");
    const caption = document.getElementById("caption");
    const thumbnails = document.querySelectorAll("#thumbnails img");
    const gallery = document.querySelector(".gallery-wrapper");

    if (!mainImage || thumbnails.length === 0) return;

    let index = 0;
    let interval = null;

    function updateGallery(i) {
        mainImage.src = thumbnails[i].src;
        caption.textContent = thumbnails[i].dataset.caption || "";

        thumbnails.forEach(img => img.classList.remove("active"));
        thumbnails[i].classList.add("active");
    }

    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener("click", () => {
            index = i;
            updateGallery(index);
        });
    });

    function startAuto() {
        stopAuto();
        interval = setInterval(() => {
            index = (index + 1) % thumbnails.length;
            updateGallery(index);
        }, 4000);
    }

    function stopAuto() {
        if (interval) clearInterval(interval);
    }

    // Hover pausa (efeito premium 🔥)
    if (gallery) {
        gallery.addEventListener("mouseenter", stopAuto);
        gallery.addEventListener("mouseleave", startAuto);
    }

    // Inicialização
    updateGallery(0);
    startAuto();
}

// ===============================
// 🎨 TÍTULO ANIMADO
// ===============================
function initTitleAnimation() {
    const title = document.querySelector('.sidebar-title');
    if (!title) return;

    let hue = 0;

    setInterval(() => {
        hue = (hue + 1) % 360;
        title.style.color = `hsl(${hue}, 100%, 60%)`;
    }, 120);
}

