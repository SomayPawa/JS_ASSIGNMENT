
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start-btn');

let score = 0;
let timer;

function startGame() {
    score = 0;
    updateScore(0);
    updateHighScore();

    timer = setInterval(() => {
        const timeLeft = parseInt(timeDisplay.innerText);
        if (timeLeft > 0) {
            timeDisplay.innerText = timeLeft - 1;
            createObject();
        } else {
            endGame();
        }
    }, 1000);

    startButton.disabled = true;
}

function endGame() {
    clearInterval(timer);
    startButton.disabled = false;
    alert(`Game over! Your score: ${score}`);
}

function createObject() {
    const object = document.createElement('div');
    object.className = 'object';
    object.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`;
    gameArea.appendChild(object);

    const animation = object.animate([
        { top: '-50px' },
        { top: `${gameArea.offsetHeight + 50}px` }
    ], {
        duration: 3000, 
        easing: 'linear',
        fill: 'forwards' 
    });

    object.onclick = () => {
        addToScore(1);
        updateHighScore();
        object.remove();
    };

    animation.onfinish = () => {
        object.remove(); 
    };
}

function updateScore(points) {
    score += points;
    scoreDisplay.innerText = score;
}

function addToScore(points) {
    const currentScore = parseInt(localStorage.getItem('score')) || 0;
    const newScore = currentScore + points;
    localStorage.setItem('score', newScore);
    updateScore(points);
}

function updateHighScore() {
    const currentScore = parseInt(localStorage.getItem('score')) || 0;
    const highScore = parseInt(localStorage.getItem('highScore')) || 0;
    if (currentScore > highScore) {
        localStorage.setItem('highScore', currentScore);
        highScoreDisplay.innerText = currentScore;
    }
}

startButton.addEventListener('click', startGame);
