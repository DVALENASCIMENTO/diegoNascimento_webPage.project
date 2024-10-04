// Variáveis de controle
let musicStarted = false; // Controle se a música de fundo já foi iniciada
let playCount = 0; // Contador de reproduções

// Mostra o popup ao carregar a página
window.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex'; // Exibe o popup como flex para centralizar o conteúdo

    // Ao clicar no popup, inicia a música
    popup.addEventListener('click', function () {
        const backgroundMusic = document.getElementById('background-music');
        if (!musicStarted) {
            backgroundMusic.play().catch(error => {
                console.error("Erro ao tocar a música de fundo:", error);
            });
            musicStarted = true;
            popup.style.display = 'none'; // Esconde o popup após o clique
        }
    });
});

// Função para tocar a música selecionada
function playSong(song) {
    const audio = document.getElementById('audio');

    // Para a música de fundo antes de tocar a nova canção
    stopMusic(); 

    audio.src = song; // Atribui o caminho da música diretamente
    audio.play().catch(error => {
        console.error("Erro ao tocar a música:", error);
    });

    playCount++;
    updatePlayCount(); // Atualiza o contador de reproduções
}

// Funções de controle de música
function pauseMusic() {
    const audio = document.getElementById('background-music');
    audio.pause();
}

function resumeMusic() {
    const audio = document.getElementById('background-music');
    audio.play();
}

function stopMusic() {
    const audio = document.getElementById('background-music');
    audio.pause();
    audio.currentTime = 0; // Reinicia a música
}

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

// Navegação do slider com as teclas de seta
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Animação de título
document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('header-title');
    if (title) { // Verifica se o elemento existe
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            title.style.color = `hsl(${hue}, 100%, 50%)`;
        }, 100);
    }
});

// Controle de visibilidade do menu
function toggleMenu() {
    const nav = document.querySelector('.sidebar-nav ul');
    if (nav) { // Verifica se o elemento existe
        nav.classList.toggle('show');
    }
}

// Recolher a sidebar após a seleção do item
function hideSidebar() {
    const nav = document.querySelector('.sidebar-nav ul');
    if (nav) { // Verifica se o elemento existe
        nav.classList.remove('show');
    }
}

// Adiciona eventos de clique aos itens da sidebar
const menuItems = document.querySelectorAll('.sidebar-nav ul li'); // Selecione os itens da sidebar
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        hideSidebar(); // Recolhe a sidebar após clicar em um item
    });
});

// Função fictícia para atualizar o contador de reproduções (necessita implementação)
function updatePlayCount() {
    // Implemente a lógica para atualizar o contador de reproduções, se necessário
    console.log(`Músicas reproduzidas: ${playCount}`);
}
