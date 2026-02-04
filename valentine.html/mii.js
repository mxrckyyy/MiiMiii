const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const mainContainer = document.getElementById('mainContainer');
const successContainer = document.getElementById('successContainer');
const beggingMessage = document.getElementById('beggingMessage');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const floatingHeartsBg = document.getElementById('floatingHeartsBg');
const floatingHeartsContainer = document.getElementById('floatingHeartsContainer');

let noButtonClickCount = 0;

const beggingTexts = [
    "HALA? 🥺",
    "sigena please 💔",
    "dika ganahan nako? 😢",
    "wala raba ni sagol atik 😒",
    "imo gud ko e reject? 🥺",
    "mohilak nalang ko oy 😭",
];

yesButton.addEventListener('click', handleYesClick);
noButton.addEventListener('click', handleNoClick);
musicToggle.addEventListener('click', toggleMusic);

function handleYesClick() {
    mainContainer.style.display = 'none';
    successContainer.style.display = 'flex';
    backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
    createFloatingHearts();
}

function handleNoClick() {
    noButtonClickCount++;
    
    if (noButtonClickCount < beggingTexts.length) {
        beggingMessage.textContent = beggingTexts[noButtonClickCount];
        yesButton.style.transform = `scale(${1 + noButtonClickCount * 0.1})`;
    } else {
        beggingMessage.textContent = "mo tyabaw nalang ko oy 💔";
    }
    
    // Make NO button smaller with each click
    const newSize = Math.max(0.5, 1 - noButtonClickCount * 0.15);
    noButton.style.transform = `scale(${newSize})`;
    
    // Move NO button to random position
    moveButtonToRandomPosition();
}

function moveButtonToRandomPosition() {
    // Generate random position within viewport bounds
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // Apply smooth transition
    noButton.style.transition = 'all 0.3s ease-in-out';
    noButton.style.position = 'fixed';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.bottom = 'auto';
    noButton.style.right = 'auto';
}

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '🔇';
    }
}

function createFloatingHearts() {
    const container = floatingHeartsContainer;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            
            container.appendChild(heart);
            
            const duration = 3000 + Math.random() * 2000;
            const xMove = (Math.random() - 0.5) * 200;
            
            heart.animate([
                { transform: 'translateY(0) translateX(0)', opacity: 1 },
                { transform: `translateY(-${window.innerHeight + 100}px) translateX(${xMove}px)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => heart.remove(), duration);
        }, i * 100);
    }
}

function createBackgroundHearts() {
    const container = floatingHeartsBg;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.opacity = '0.3';
        heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
        
        container.appendChild(heart);
        
        const duration = 8000 + Math.random() * 4000;
        const delay = Math.random() * 2000;
        
        heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.3 },
            { transform: 'translateY(-50px) rotate(360deg)', opacity: 0.1 }
        ], {
            duration: duration,
            delay: delay,
            iterations: Infinity
        });
    }
}

// Initialize background hearts
createBackgroundHearts();