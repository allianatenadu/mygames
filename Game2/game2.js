document.addEventListener('DOMContentLoaded', () => {
    const songs = [
        {src: 'audio/song1.mp3', artist: 'Black Sherif'},
        {src: 'audio/song2.mp3', artist: 'Iniko'},
        {src: 'audio/song3.wav', artist: 'RTD Ankapong'}
    ];
    let currentSongIndex = 0;
    let attemptsLeft = 3;
    let level = 1;
    let timer;  // To keep track of the timer

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
        audioPlayer.src = songs[currentSongIndex].src;
        audioPlayer.play();
        timer = setTimeout(() => {
            audioPlayer.pause();
            message.textContent = `Time's up! The correct answer was ${songs[currentSongIndex].artist}.`;
            attemptsLeft--;
            if (attemptsLeft <= 0) {
                message.textContent = `Sorry, you lost! The correct answer was ${songs[currentSongIndex].artist}.`;
                resetGame();
            }
            updateLevelAndAttempts();
        }, 60000); // play for 1 minute (60000 ms)
    }

    function checkAnswer() {
        const userGuess = artistInput.value.trim();
        if (userGuess.toLowerCase() === songs[currentSongIndex].artist.toLowerCase()) {
            message.textContent = 'Correct! Moving to the next level!';
            clearTimeout(timer);  // Stop the timer
            audioPlayer.pause();
            level++;
            currentSongIndex++;
            if (currentSongIndex >= songs.length) {
                message.textContent = 'Congratulations! You have completed all levels!';
                resetGame();
            } else {
                playSong();  // Play the next song
            }
        } else {
            attemptsLeft--;
            message.textContent = `Incorrect! You have ${attemptsLeft} attempts left.`;
            if (attemptsLeft <= 0) {
                message.textContent = `Sorry, you lost! The correct answer was ${songs[currentSongIndex].artist}.`;
                resetGame();
            }
        }
        artistInput.value = '';
        updateLevelAndAttempts();
    }

    function updateLevelAndAttempts() {
        levelDisplay.textContent = `Level: ${level}`;
        attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
    }

    function resetGame() {
        currentSongIndex = 0;
        attemptsLeft = 3;
        level = 1;
        updateLevelAndAttempts();
    }

    updateLevelAndAttempts();
});
