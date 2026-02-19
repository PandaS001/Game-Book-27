const CONFIG = {
    musicEnabled: true,
    siteName: 'Game Book 27',
    siteUrl: 'https://gamebook27.com'
};

const games = [
    {
        id: 1,
        title: 'Крестики-нолики 3D',
        description: 'Игра на вращающемся кубе. 54 выигрышные комбинации!',
        icon: '🎲',
        color: '#ff4d4d',
        url: 'https://pandas001.github.io/3D-Cub-/',
        gradient: 'linear-gradient(135deg, #ff4d4d, #ff9d4d)',
        players: '2 игрока'
    },
    {
        id: 2,
        title: 'Поле Чудес',
        description: '50 слов, барабан, призы. Отгадай все слова!',
        icon: '🎡',
        color: '#00ffff',
        url: 'https://pandas001.github.io/50-uz/',
        gradient: 'linear-gradient(135deg, #00ffff, #4d4dff)',
        players: '1 игрок'
    },
    {
        id: 3,
        title: '50 Загадок',
        description: 'Проверь свой интеллект. Загадки разной сложности.',
        icon: '🧠',
        color: '#00ff9d',
        url: 'https://pandas001.github.io/50/',
        gradient: 'linear-gradient(135deg, #00ff9d, #00ccff)',
        players: '1 игрок'
    },
    {
        id: 4,
        title: 'Крестики-нолики с ИИ',
        description: 'Сразись с умным искусственным интеллектом!',
        icon: '🤖',
        color: '#ff00ff',
        url: 'https://pandas001.github.io/X0/',
        gradient: 'linear-gradient(135deg, #ff00ff, #ff66ff)',
        players: '1 игрок'
    },
    {
        id: 5,
        title: 'Крестики-нолики 2 игрока',
        description: 'Классическая игра для двоих на одном устройстве.',
        icon: '👥',
        color: '#ffff00',
        url: 'https://pandas001.github.io/X0-NN/',
        gradient: 'linear-gradient(135deg, #ffff00, #ffaa00)',
        players: '2 игрока'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const mainPage = document.querySelector('.main-page');
    const musicControl = document.querySelector('.music-control');
    const bgMusic = document.getElementById('bgMusic');
    const gamesGrid = document.getElementById('games-grid');
    
    createConstellations();
    renderGames(gamesGrid);
    
    if (CONFIG.musicEnabled) {
        bgMusic.volume = 0.3;
        musicControl.addEventListener('click', toggleMusic);
        bgMusic.play().catch(() => {
            musicControl.textContent = '🎵';
        });
    }
    
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainPage.style.display = 'block';
        updateSEOMetadata();
    }, 2000);
    
    addSchemaMarkup();
});

function createConstellations() {
    const container = document.querySelector('.constellations');
    const symbols = ['✨', '⭐', '🌟', '💫', '⚡', '🌠'];
    
    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.className = 'constellation';
        star.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = (8 + Math.random() * 15) + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.fontSize = (15 + Math.random() * 30) + 'px';
        container.appendChild(star);
    }
}

function renderGames(grid) {
    grid.innerHTML = '';
    
    games.forEach(game => {
        const cardLink = document.createElement('a');
        cardLink.href = game.url;
        cardLink.target = '_blank';
        cardLink.rel = 'noopener noreferrer';
        cardLink.className = 'game-card';
        cardLink.setAttribute('data-game-id', game.id);
        
        const svgImage = createGameSVG(game);
        
        cardLink.innerHTML = `
            <div class="game-image">
                ${svgImage}
            </div>
            <h2 class="game-title">${game.title}</h2>
            <div class="game-badge">${game.players}</div>
            <p class="game-description">${game.description}</p>
            <div class="play-button">
                <span class="button-icon">▶</span>
                Играть
            </div>
        `;
        
        cardLink.style.setProperty('--card-glow', game.color);
        grid.appendChild(cardLink);
    });
}

function createGameSVG(game) {
    return `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad${game.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${game.color};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${game.color};stop-opacity:0.3" />
                </linearGradient>
                <filter id="glow${game.id}">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <rect width="200" height="200" fill="url(#grad${game.id})" opacity="0.2"/>
            <circle cx="100" cy="100" r="80" fill="none" stroke="${game.color}" stroke-width="3" filter="url(#glow${game.id})"/>
            <text x="100" y="120" font-size="80" text-anchor="middle" fill="white" filter="url(#glow${game.id})">${game.icon}</text>
            <text x="100" y="170" font-size="20" text-anchor="middle" fill="${game.color}" filter="url(#glow${game.id})">${game.title}</text>
        </svg>
    `;
}

function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.querySelector('.music-control');
    
    if (bgMusic.paused) {
        bgMusic.play();
        musicControl.textContent = '🔊';
    } else {
        bgMusic.pause();
        musicControl.textContent = '🎵';
    }
}

function updateSEOMetadata() {
    document.title = `${CONFIG.siteName} - Крестики-нолики 3D, с ИИ и для двоих | Поле Чудес | Загадки`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'Game Book 27 - коллекция из 5 игр: Крестики-нолики 3D, Крестики-нолики с ИИ, Крестики-нолики для двоих, Поле Чудес, 50 загадок. Играйте бесплатно!';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Game Book 27, крестики нолики, крестики нолики 3D, крестики нолики с ИИ, крестики нолики для двоих, поле чудес, загадки, игры онлайн';
}

function addSchemaMarkup() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Game Book 27",
        "description": "Коллекция неоновых игр: крестики-нолики в разных вариациях, поле чудес и загадки",
        "url": CONFIG.siteUrl,
        "numberOfItems": games.length,
        "hasPart": games.map(game => ({
            "@type": "VideoGame",
            "name": game.title,
            "description": game.description,
            "url": game.url,
            "playMode": game.players === '1 игрок' ? "SinglePlayer" : "MultiPlayer",
            "numberOfPlayers": game.players === '1 игрок' ? "1" : "2",
            "applicationCategory": "Game"
        }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

}


