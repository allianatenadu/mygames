document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('result');
    
    const choicesArray = ['rock', 'paper', 'scissors'];

    choices.forEach(choice => {
        choice.addEventListener('click', (e) => {
            const userChoice = e.target.id;
            userChoiceDisplay.textContent = `You chose: ${userChoice}`;
            const computerChoice = generateComputerChoice();
            computerChoiceDisplay.textContent = `Computer chose: ${computerChoice}`;
            const result = getResult(userChoice, computerChoice);
            resultDisplay.textContent = `Result: ${result}`;
        });
    });

    function generateComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choicesArray.length);
        return choicesArray[randomIndex];
    }

    function getResult(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "It's a draw!";
        }
        if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'scissors' && computerChoice === 'paper') ||
            (userChoice === 'paper' && computerChoice === 'rock')
        ) {
            return "You win!";
        } else {
            return "You lose!";
        }
    }
});
