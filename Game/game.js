const canvas = document.getElementById('pongCanvas');
        const context = canvas.getContext('2d');

        canvas.width = 800;
        canvas.height = 400;

        const paddleWidth = 10;
        const paddleHeight = 100;
        const ballSize = 10;

        let playerY = canvas.height / 2 - paddleHeight / 2;
        let computerY = canvas.height / 2 - paddleHeight / 2;
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 5;
        let ballSpeedY = 2;

        let playerScore = 0;
        let computerScore = 0;

        const hitSound = document.getElementById('hitSound');
        const scoreSound = document.getElementById('scoreSound');

        let gameStarted = false;
        let gamePaused = false;
        let requestId;
        const computerSpeed = 1.5; // Reduce the speed to make the game easier

        document.getElementById('start-game').addEventListener('click', startGame);
        document.getElementById('pause-game').addEventListener('click', togglePause);

        function startGame() {
            if (!gameStarted) {
                gameStarted = true;
                gamePaused = false;
                playerScore = 0;
                computerScore = 0;
                document.getElementById('pause-game').textContent = 'Pause';
                gameLoop();
            }
        }

        function drawRect(x, y, width, height, color) {
            context.fillStyle = color;
            context.fillRect(x, y, width, height);
        }

        function drawBall(x, y, size, color) {
            context.fillStyle = color;
            context.beginPath();
            context.arc(x, y, size, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        }

        function drawNet() {
            for (let i = 0; i <= canvas.height; i += 20) {
                drawRect(canvas.width / 2 - 1, i, 2, 10, '#fff');
            }
        }

        function drawText(text, x, y, color) {
            context.fillStyle = color;
            context.font = "35px Arial";
            context.fillText(text, x, y);
        }

        function update() {
            if (!gamePaused) {
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
                    ballSpeedY = -ballSpeedY;
                }

                if (ballX - ballSize < paddleWidth) {
                    if (ballY > playerY && ballY < playerY + paddleHeight) {
                        ballSpeedX = -ballSpeedX;
                        hitSound.play();
                    } else {
                        computerScore++;
                        scoreSound.play();
                        resetBall();
                    }
                }

                if (ballX + ballSize > canvas.width - paddleWidth) {
                    if (ballY > computerY && ballY < computerY + paddleHeight) {
                        ballSpeedX = -ballSpeedX;
                        hitSound.play();
                    } else {
                        playerScore++;
                        scoreSound.play();
                        resetBall();
                    }
                }

                if (computerY + paddleHeight / 2 < ballY) {
                    computerY += computerSpeed;
                } else {
                    computerY -= computerSpeed;
                }

                // Check for winner
                if (playerScore >= 10 || computerScore >= 10) {
                    endGame();
                }
            }
        }

        function resetBall() {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballSpeedX = -ballSpeedX;
        }

        canvas.addEventListener('mousemove', event => {
            const rect = canvas.getBoundingClientRect();
            const root = document.documentElement;
            const mouseY = event.clientY - rect.top - root.scrollTop;
            playerY = mouseY - paddleHeight / 2;
        });

        function draw() {
            drawRect(0, 0, canvas.width, canvas.height, '#000');
            drawNet();
            drawRect(0, playerY, paddleWidth, paddleHeight, '#fff');
            drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, '#fff');
            drawBall(ballX, ballY, ballSize, '#fff');
            drawText(playerScore, canvas.width / 4, canvas.height / 5, '#fff');
            drawText(computerScore, 3 * canvas.width / 4, canvas.height / 5, '#fff');
        }

        function gameLoop() {
            if (gameStarted) {
                update();
                draw();
                if (!gamePaused) {
                    requestId = requestAnimationFrame(gameLoop);
                }
            }
        }

        function endGame() {
            gameStarted = false;
            alert(playerScore >= 10 ? "You win!" : "Computer wins!");
            // Reset game state
            playerScore = 0;
            computerScore = 0;
            draw();
        }

        function togglePause() {
            gamePaused = !gamePaused;
            if (gamePaused) {
                document.getElementById('pause-game').textContent = 'Play';
                cancelAnimationFrame(requestId);
            } else {
                document.getElementById('pause-game').textContent = 'Pause';
                gameLoop();
            }
        }

        function initializeGame() {
            if (localStorage.getItem('gamePaused') === 'true') {
                gamePaused = true;
                document.getElementById('pause-game').textContent = 'Play';
            } else {
                document.getElementById('pause-game').textContent = 'Pause';
            }
        }

        initializeGame();