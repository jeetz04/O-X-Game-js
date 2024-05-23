const choices = document.querySelectorAll(".choice");
const userScoreText = document.querySelector("#user-score");
const botScoreText = document.querySelector("#bot-score");
const alertMsg = document.querySelector("#win-alert");
const msgBox = document.querySelector(".msg-box")
const resetBtn = document.querySelector("#reset-btn")

let userScore = 0;
let botScore = 0;

// User Choice selection --------------------------------------------------------
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})

// Bot Choice selection --------------------------------------------------------
const botOptions = () => {
    const options = ["paper", "rock", "scissor"];
    let random = Math.floor(Math.random() * 3);
    return options[random];
}


// Game logic & Choices compairing ----------------------------------------------
const playGame = (userChoice) => {
    const botChoice = botOptions(); { }
    if (botChoice != userChoice) {
        let userWin = true;
        if (userChoice === "paper") {
            userWin = botChoice === "scissor" ? false : true
        }
        else if (userChoice === "rock") {
            userWin = botChoice === "paper" ? false : true
        }
        else {
            userWin = botChoice === "rock" ? false : true
        }

        winner(userWin, userChoice, botChoice)
    }
    else {
        draw(userChoice)
    }
}


// Draw match ----------------------------------------------------------------------
const draw = (userChoice) => {
    alertMsg.innerText = `It was draw with ${userChoice}`
    msgBox.style.backgroundColor = "rgb(10, 10, 37)"
}


// Rounds Winner --------------------------------------------------------------------
const winner = (userWin, userChoice, botChoice) => {
    if (userWin) {
        userScore += 1;
        userScoreText.innerText = userScore;
        alertMsg.innerText = `You won! ${userChoice} beat ${botChoice}`
        msgBox.style.backgroundColor = "green"
    }
    else {
        console.log("You lose")
        botScore += 1;
        botScoreText.innerText = botScore;
        alertMsg.innerText = `You lose! ${botChoice} beat ${userChoice}`
        msgBox.style.backgroundColor = "red"
    }
    finalWinner(userScore, botScore)
}


// Final winner, first to score 10 ----------------------------------------------------
const finalWinner = (userScore, botScore) => {
    if (userScore == 10 || botScore == 10) {
        if (userScore == 10) {
            alertMsg.innerText = "You won the game! Reset to play again";
        }
        else if (botScore == 10) {
            alertMsg.innerText = "Bot won the game! Reset to play again";
        }

        disabledChoices()
    }
}


// Disable and Enable user Choices ------------------------------------------------------
const disabledChoices = () => {
    for (let choice of choices) {
        choice.disabled = true;
    }
}

const enableChoices = () => {
    for (let choice of choices) {
        choice.disabled = false;
    }
}


// Reset Game to play Again --------------------------------------------------------------
const resetGame = () => {
    userScore = 0;  // Reset global variables, not local
    botScore = 0;   // Reset global variables, not local
    userScoreText.innerText = userScore;
    botScoreText.innerText = botScore;
    alertMsg.innerText = "Play your move";
    msgBox.style.backgroundColor = "rgb(10, 10, 37)";
    enableChoices();
}

resetBtn.addEventListener("click", resetGame)