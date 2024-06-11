document.addEventListener('DOMContentLoaded', () => {
    // Define the levels with their respective songs and artists
    const levels = [
        [
            {src: 'audio/song1.mp3', artist: 'Black Sherif'},
            {src: 'audio/song2.mp3', artist: 'Stoneboy'},
            {src: 'audio/song8.mp3', artist: 'Ayra Star'}
        ],
        [
            {src: 'audio/song4.mp3', artist: 'Rema'},
            {src: 'audio/song5.mp3', artist: 'Yhaw Hero'},
            {src: 'audio/song6.mp3', artist: 'Ellie Goulding'}
        ],
        [
            {src: 'audio/song3.wav', artist: 'RTD Ankapong'},
            {src: 'audio/song7.mp3', artist: 'Iniko'},
            {src: 'audio/song9.mp3', artist: 'Yhaw Hero'}
        ]
    ];

    // Initialize game state variables
    let currentLevel = 0;
    let currentStage = 0;
    let attemptsLeft = 3;
    let totalAttempts = 3;
    let timer;

    // Get references to DOM elements
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const submitBtn = document.getElementById('submit-btn');
    const artistInput = document.getElementById('artist-input');
    const message = document.getElementById('message');
    const levelDisplay = document.getElementById('level');
    const attemptsDisplay = document.getElementById('attempts');

    // Add event listener to play button
    playBtn.addEventListener('click', () => {
        playSong();
    });

    // Add event listener to submit button
    submitBtn.addEventListener('click', () => {
        checkAnswer();
    });

    // Function to play the current song
    function playSong() {
        const song = levels[currentLevel][currentStage];
        audioPlayer.src = song.src;
        audioPlayer.play();
        timer = setTimeout(() => {
            audioPlayer.pause();
            message.textContent = `Time's up! Type your answer below.`;
        }, 60000); // play for 1 minute (60000 ms)
    }

    // Function to check the user's answer
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
            artistInput.value = '';
            updateLevelAndAttempts();
            playSong(); // Automatically play the next song
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

    // Function to update the level and attempts display
    function updateLevelAndAttempts() {
        levelDisplay.textContent = `Level: ${currentLevel + 1} - Stage: ${currentStage + 1}`;
        attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
    }

    // Function to reset the game
    function resetGame() {
        currentLevel = 0;
        currentStage = 0;
        attemptsLeft = totalAttempts;
        updateLevelAndAttempts();
        audioPlayer.pause();
    }

    // Initialize the level and attempts display
    updateLevelAndAttempts();
});
