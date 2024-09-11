let musicStarted = false;

document.addEventListener('click', function() {
    if (!musicStarted) {
        document.getElementById('background-music').play();
        musicStarted = true;
    }
});

function playSong(song) {
    const audio = document.getElementById('audio');
    switch(song) {
        case 'song1':
            audio.src = 'path/to/song1.mp3'; // Substitua pelo caminho correto
            break;
        case 'song2':
            audio.src = 'path/to/song2.mp3'; // Substitua pelo caminho correto
            break;
        default:
            audio.src = '';
    }
    audio.play();
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
});

// Slider de Imagens
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slider img');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Animação de título
document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('header-title');
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        title.style.color = `hsl(${hue}, 100%, 50%)`;
    }, 100);
});
