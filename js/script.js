// ===============================
// VARIÁVEIS GLOBAIS
// ===============================
let currentPage = 0;
let pages = [];

let currentTrackIndex = 0;
let audioElement;
let isPlaying = false;
let radioStarted = false;

let images = [];
let currentImageIndex = 0;
let autoSlide;

// ===============================
// PLAYLIST
// ===============================
const playlist = [
    { src: "sounds/Always on My Mind (Elvis Presley).mp3", name: "Always on My Mind" },
    { src: "sounds/Cant_Help_Falling_inLove.mp3", name: "Can't Help Falling in Love" },
    { src: "sounds/El Reloj_.mp3", name: "El Reloj" },
    { src: "sounds/flyMeToTheMoon_1min.mp3", name: "Fly Me to the Moon" },
    { src: "sounds/Here Comes the Sun.mp3", name: "Here Comes the Sun" },
    { src: "sounds/Its Now or Never.mp3", name: "It's Now or Never" },
    { src: "sounds/Kiss Me Quick_ (Elvis Presley).mp3", name: "Kiss Me Quick" },
    { src: "sounds/la Barca_.mp3", name: "La Barca" },
    { src: "sounds/My Way_ (Elvis Presley).mp3", name: "My Way" },
    { src: "sounds/NewYork_NewYork.mp3", name: "New York, New York" },
    { src: "sounds/Something.mp3", name: "Something" },
    { src: "sounds/Somewhere Over The Rainbow.mp3", name: "Somewhere Over The Rainbow" },
    { src: "sounds/Suspicious Mind_ (Elvis Presley).mp3", name: "Suspicious Minds" },
    { src: "sounds/While My Guitar Gentle Weeps.mp3", name: "While My Guitar Gently Weeps" },
    { src: "sounds/Yesterday(Elvis Presley).mp3", name: "Yesterday" }
];

// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    initBook();
    initAudio();
    initMenu();
    initGallery();
    initTitleAnimation();
    initVideoControl();
});

// ===============================
// 📖 LIVRO (BIOGRAFIA)
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
// 🎧 PLAYER / RÁDIO
// ===============================
function initAudio() {
    audioElement = document.getElementById("audio");
    if (!audioElement) return;

    audioElement.volume = 0.6;

    // tocar automaticamente no primeiro clique do usuário
    document.addEventListener("click", () => {
        if (!radioStarted) {
            radioStarted = true;
            playTrack(currentTrackIndex);
        }
    }, { once: true });

    audioElement.addEventListener("ended", nextTrack);
}

function playTrack(index) {
    const track = playlist[index];
    if (!track) return;

    currentTrackIndex = index;

    audioElement.src = encodeURI(track.src);
    audioElement.load();

    audioElement.play().then(() => {
        isPlaying = true;
        updatePlayButton();
    }).catch(() => {});

    const trackName = document.getElementById("current-track");
    if (trackName) {
        trackName.textContent = "🎵 Tocando: " + track.name;
    }
}

function togglePlay() {
    if (!audioElement) return;

    if (audioElement.paused) {
        audioElement.play();
        isPlaying = true;
    } else {
        audioElement.pause();
        isPlaying = false;
    }

    updatePlayButton();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playTrack(currentTrackIndex);
}

function updatePlayButton() {
    const btn = document.getElementById("play-btn");
    if (!btn) return;

    btn.textContent = isPlaying ? "⏸️" : "▶️";
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
// 🖼️ GALERIA
// ===============================
function initGallery() {
    images = document.querySelectorAll('.thumbnails img');
    if (images.length === 0) return;

    selectImage(0);

    autoSlide = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        selectImage(currentImageIndex);
    }, 4000);
}

function selectImage(index) {
    const mainImage = document.getElementById('currentImage');
    if (!mainImage) return;

    currentImageIndex = index;
    mainImage.src = images[index].src;

    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
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

// ===============================
// 🎬 PAUSAR RÁDIO AO DAR PLAY NO VÍDEO
// ===============================
function initVideoControl() {
    const videos = document.querySelectorAll("video");

    videos.forEach(video => {

        // Quando o vídeo começa
        video.addEventListener("play", () => {
            if (audioElement && !audioElement.paused) {
                audioElement.pause();
                isPlaying = false;
                updatePlayButton();
            }
        });

        // (Opcional 🔥) Quando o vídeo pausa, a rádio volta
        video.addEventListener("pause", () => {
            if (audioElement && !isPlaying && radioStarted) {
                audioElement.play().catch(() => {});
                isPlaying = true;
                updatePlayButton();
            }
        });

    });
}