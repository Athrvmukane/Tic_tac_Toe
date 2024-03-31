const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer = "X";
let gameGrid = Array(9).fill("");
let isGameActive = true;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid.fill("");
    isGameActive = true;
    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("win");
    });
    gameInfo.innerText = `Player ${currentPlayer}'s turn`;
    newGameBtn.classList.remove("active");
    newGameBtn.style.display = "none"; // Hide the button initially
}

// Swap the player's turn
function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Player ${currentPlayer}'s turn`;
}

// Check if the game is over due to a win or a tie
function checkGameOver() {
    let roundWon = false;

    for (const winCondition of winningPositions) {
        const [a, b, c] = winCondition;
        const posA = gameGrid[a];
        const posB = gameGrid[b];
        const posC = gameGrid[c];

        if (posA === "" || posB === "" || posC === "") {
            continue;
        }
        if (posA === posB && posB === posC) {
            roundWon = true;
            isGameActive = false;
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            break;
        }
    }

    if (roundWon) {
        gameInfo.innerText = `Player ${currentPlayer} Wins!`;
        newGameBtn.style.display = "block"; // Show the New Game button
        return;
    }

    if (!gameGrid.includes("")) {
        gameInfo.innerText = "It's a tie!";
        newGameBtn.style.display = "block"; // Show the New Game button
        return;
    }

    swapTurn();
}

// Handle a box being clicked
function handleBoxClick(clickedBoxIndex) {
    if (isGameActive && gameGrid[clickedBoxIndex] === "") {
        gameGrid[clickedBoxIndex] = currentPlayer;
        boxes[clickedBoxIndex].innerText = currentPlayer;
        checkGameOver();
    }
}

// Add event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(index));
});

// Add event listener to the New Game button
newGameBtn.addEventListener('click', initGame);

// Initialize the game on page load
initGame();
