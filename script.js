// let form = document.querySelector('form');
// let result = document.querySelector("#result");
// let guessRemain = document.getElementsByClassName('guessRemain');
// let previousGuess = [];

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     let userInput = document.getElementById('guessInput').value;
//     let ranNo = random();

//     if (userInput == ranNo) {
//         result.innerHTML = "You Won";
//     } else if (userInput > ranNo) {
//         result.innerHTML = "Guess too High";
//     } else {
//         result.innerHTML = "Guess too Low";
//     }
// })

let submit = document.querySelector('form');

let userInput = document.getElementById("guessInput");

const prevGuess = document.querySelector(".guess");
const guessRemain = document.querySelector(".guessRemain");

const p = document.querySelector("#result");

let random = function random() {
    return Math.round((Math.random() * 100) + 1);
}

let preVal = [];
let noOfGuess = 10;

let playGame = true;

if (playGame) {

    submit.addEventListener('submit', function (e) {
        e.preventDefault();
        let guessVal = parseInt(userInput.value);
        // console.log(guessVal);
        validateGuess(guessVal);
    })

} else {
    playAgain();
}

function validateGuess(guessVal) {

    if (!guessVal || isNaN(guessVal)) {
        userInput.classList.add("error");
        setTimeout(() => userInput.classList.remove("error"), 2000);
        return;
    }

    if (guessVal > 100) {
        showAlert("⚠️ Number cannot be greater than 100!");
    } else if (guessVal <= 0) {
        showAlert("⚠️ Number must be greater than 0");
    } else {
        preVal.push(guessVal);
        noOfGuess--;
        if (noOfGuess < 0) {
            gameOver();
        } else {
            checkGuess(guessVal);
        }
    }
}

function checkGuess(guessVal) {
    //console.log(guessVal);
    let ran = random();

    if (guessVal === ran) {
        displayMessage("You Won!  hurrrayyy");
        playAgain();
    } else if (guessVal > ran) {
        displayMessage("You guess too high");
        userInput.value = '';
    } else {
        displayMessage("You guess too low");
        userInput.value = '';
    }
}

function displayMessage(message) {
    prevGuess.innerHTML = `<br> ${preVal}`;
    guessRemain.innerHTML = `${noOfGuess}`;
    p.innerHTML = `<h4 style="color:purple">${message}</h4>`
}

function gameOver() {
    document.querySelector("#sub").remove();
    p.innerHTML = `<h4 style="color:purple">Game Over! Restart</h4>`
    playAgain();
};

function playAgain() {

    if (!document.getElementById("restartBtn")) {
        const restartBtn = document.createElement("input");
        restartBtn.type = "submit";
        restartBtn.value = "Restart";
        restartBtn.id = "restartBtn";
        restartBtn.classList.add("restart-button");
        restartBtn.addEventListener("click", function (e) {
            e.preventDefault();
            location.reload(); // Refresh the page on click
        });
        document.querySelector("form").appendChild(restartBtn);
    }

}


function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert");
    alertBox.innerHTML = `<p>${message}</p><button onclick="closeAlert()">OK</button>`;
    document.body.appendChild(alertBox);
    alertBox.style.display = "block";
}
function closeAlert() {
    document.querySelector(".custom-alert").remove();
    userInput.value = '';
}





