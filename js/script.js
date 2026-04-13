// ===============================
// VARIÁVEIS DE CONTROLE
// ===============================
let musicStarted = false;
let playCount = 0;
let currentSlide = 0;
let slideInterval;

// ===============================
// INICIALIZAÇÃO GERAL (UNIFICADA)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    initPopup();
    initAudio();
    initSlider();
    initMenu();
    initTitleAnimation();
});

// ===============================
// POPUP + MÚSICA DE FUNDO
// ===============================
function initPopup() {
    const popup = document.getElementById('popup');
    const backgroundMusic = document.getElementById('background-music');

    if (!popup || !backgroundMusic) return;

    if (!localStorage.getItem("musicStarted")) {
        popup.style.display = 'flex';
    }

    popup.addEventListener('click', () => {
        if (!musicStarted) {
            backgroundMusic.play().catch(error => {
                console.error("Erro ao tocar a música de fundo:", error);
            });

            musicStarted = true;
            localStorage.setItem("musicStarted", "true");
            popup.style.display = 'none';
        }
    });
}

// ===============================
// PLAYER DE MÚSICA
// ===============================
function initAudio() {
    const audio = document.getElementById('audio');
    const backgroundMusic = document.getElementById('background-music');

    if (!audio || !backgroundMusic) return;

    audio.addEventListener('ended', () => {
        backgroundMusic.play().catch(() => {});
    });
}

function playSong(song) {
    const audio = document.getElementById('audio');
    const backgroundMusic = document.getElementById('background-music');

    if (!audio) {
        console.error("Elemento de áudio não encontrado");
        return;
    }

    // Para música de fundo
    if (backgroundMusic) {
        backgroundMusic.pause();
    }

    // RESET COMPLETO (ESSENCIAL)
    audio.pause();
    audio.currentTime = 0;

    // Corrige possíveis problemas de caminho (encode automático)
    const encodedSong = encodeURI(song);

    audio.src = encodedSong;
    audio.load(); // 🔥 força carregamento

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("Música tocando:", song);
            })
            .catch(error => {
                console.error("Erro ao tocar:", error);
                alert("Erro ao reproduzir a música. Verifique o caminho do arquivo.");
            });
    }

    playCount++;
    updatePlayCount();
}

// ===============================
// CONTROLE DE MÚSICA
// ===============================
function pauseMusic() {
    document.getElementById('background-music')?.pause();
}

function resumeMusic() {
    document.getElementById('background-music')?.play();
}

function stopMusic() {
    const audio = document.getElementById('background-music');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

// ===============================
// SLIDER (CORRIGIDO)
// ===============================
function initSlider() {
    const slides = document.querySelectorAll('.slider img');
    const slider = document.querySelector('.slider');

    if (!slides.length || !slider) {
        console.warn("Slider não encontrado ou sem imagens.");
        return;
    }

    // Garante posição inicial
    currentSlide = 0;
    updateSlider();

    // Autoplay
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function updateSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slider img');

    if (!slides.length) return;

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    updateSlider();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// ===============================
// TECLADO
// ===============================
document.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

    if (event.key === 'ArrowRight') nextSlide();
    if (event.key === 'ArrowLeft') prevSlide();
});

// ===============================
// MENU MOBILE
// ===============================
function initMenu() {
    const menuItems = document.querySelectorAll('.sidebar-nav ul li');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hideSidebar();
        });
    });
}

function toggleMenu() {
    const nav = document.querySelector('.sidebar-nav ul');
    nav?.classList.toggle('show');
}

function hideSidebar() {
    const nav = document.querySelector('.sidebar-nav ul');
    nav?.classList.remove('show');
}

// ===============================
// ANIMAÇÃO DE TÍTULO
// ===============================
function initTitleAnimation() {
    const title = document.getElementById('header-title');

    if (!title) return;

    let hue = 0;

    setInterval(() => {
        hue = (hue + 1) % 360;
        title.style.color = `hsl(${hue}, 100%, 50%)`;
    }, 150);
}

// ===============================
// CONTADOR DE REPRODUÇÃO
// ===============================
function updatePlayCount() {
    console.log(`Músicas reproduzidas: ${playCount}`);
}

let images = [];
let currentIndex = 0;
let autoSlide;

// Inicializa galeria
document.addEventListener('DOMContentLoaded', () => {
    images = document.querySelectorAll('.thumbnails img');

    if (images.length === 0) return;

    selectImage(0);

    // Auto troca
    autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        selectImage(currentIndex);
    }, 4000);
});

function selectImage(index) {
    const mainImage = document.getElementById('currentImage');

    if (!mainImage || images.length === 0) return;

    currentIndex = index;

    mainImage.src = images[index].src;

    // Atualiza destaque
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}