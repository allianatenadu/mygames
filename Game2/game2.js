document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        [
            {src: 'audio/song1.mp3', artist: 'Artist1'},
            {src: 'audio/song2.mp3', artist: 'Artist2'},
            {src: 'audio/song3.mp3', artist: 'Artist3'}
        ],
        [
            {src: 'audio/song4.mp3', artist: 'Artist4'},
            {src: 'audio/song5.mp3', artist: 'Artist5'},
            {src: 'audio/song6.mp3', artist: 'Artist6'}
        ],
        [
            {src: 'audio/song7.mp3', artist: 'Artist7'},
            {src: 'audio/song8.mp3', artist: 'Artist8'},
            {src: 'audio/song9.mp3', artist: 'Artist9'}
        ]
    ];
    let currentLevel = 0;
    let currentStage = 0;
    let attemptsLeft = 3;
    let totalAttempts = 3;
    let timer;

    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const submitBtn = document.getElementById('submit-btn');
    const artistInput = document.getElementById('artist-input');
    const message = document.getElementById('message');
    const levelDisplay = document.getElementById('level');
    const attemptsDisplay = document.getElementById('attempts');

    playBtn.addEventListener('click', () => {
        playSong();
    });

    submitBtn.addEventListener('click', () => {
        checkAnswer();
    });

    function playSong() {
        const song = levels[currentLevel][currentStage];
        audioPlayer.src = song.src;
        audioPlayer.play();
        timer = setTimeout(() => {
            audioPlayer.pause();
            message.textContent = `Time's up! The correct answer was ${song.artist}.`;
            attemptsLeft--;
            if (attemptsLeft <= 0) {
                message.textContent = `Sorry, you lost! The correct answer was ${song.artist}.`;
                resetGame();
            }
            updateLevelAndAttempts();
        }, 60000); // play for 1 minute (60000 ms)
    }

    function checkAnswer() {
        const userGuess = artistInput.value.trim();
        const song = levels[currentLevel][currentStage];
        if (userGuess.toLowerCase() === song.artist.toLowerCase()) {
            message.textContent = 'Correct!';
            clearTimeout(timer);  // Stop the timer
            audioPlayer.pause();
            currentStage++;
            if (currentStage >= levels[currentLevel].length) {
                currentLevel++;
                currentStage = 0;
                if (currentLevel >= levels.length) {
                    message.textContent = 'Congratulations! You have completed all levels!';
                    resetGame();
                } else {
                    message.textContent = `Level ${currentLevel} completed! Moving to Level ${currentLevel + 1}.`;
                }
            }
        } else {
            attemptsLeft--;
            message.textContent = `Incorrect! You have ${attemptsLeft} attempts left.`;
            if (attemptsLeft <= 0) {
                message.textContent = `Sorry, you lost! The correct answer was ${song.artist}.`;
                resetGame();
            }
        }
        artistInput.value = '';
        updateLevelAndAttempts();
    }

    function updateLevelAndAttempts() {
        levelDisplay.textContent = `Level: ${currentLevel + 1} - Stage: ${currentStage + 1}`;
        attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
    }

    function resetGame() {
        currentLevel = 0;
        currentStage = 0;
        attemptsLeft = totalAttempts;
        updateLevelAndAttempts();
    }

    updateLevelAndAttempts();
});
