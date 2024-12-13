const gameboard = document.getElementById("game-board");
let cardValues = [
    "images/card-1.png", "images/card-2.png", "images/card-3.png", "images/card-4.png",
    "images/card-5.png", "images/card-6.png", "images/card-7.png", "images/card-8.png"
];
let memoryCards = [...cardValues, ...cardValues];

memoryCards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let lockBoard = false;

function createGameboard() {
    gameboard.innerHTML = '';
    memoryCards.forEach((value, index) => {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memoryCard');

        const memoryFront = document.createElement('div');
        memoryFront.classList.add('memoryFront')
        const frontImage = document.createElement('img');
        frontImage.src = value;
        memoryFront.appendChild(frontImage);

        const memoryBack = document.createElement('div');
        memoryBack.classList.add('memoryBack');
        const backImage = document.createElement('img');
        backImage.src = "images/card.png";
        memoryBack.appendChild(backImage)

        memoryCard.appendChild(memoryFront);
        memoryCard.appendChild(memoryBack);

        memoryCard.addEventListener('click', () => flipMemory(memoryCard));
        gameboard.appendChild(memoryCard);
    });
}

function flipMemory(cardMemory) {
    if (lockBoard || flippedCards.includes(cardMemory)) return;

    cardMemory.classList.add('flipped');
    flippedCards.push(cardMemory);

    if (flippedCards.length === 2) {
        lockBoard = true;

        const [cardMemory1, cardMemory2] = flippedCards;
        const cardMemory1Value = cardMemory1.querySelector('.memoryFront img').src;
        const cardMemory2Value = cardMemory2.querySelector('.memoryFront img').src;

        if (cardMemory1Value === cardMemory2Value) {
            flippedCards = [];
            lockBoard = false;
        } else {
            setTimeout(() => {
                cardMemory1.classList.remove('flipped');
                cardMemory2.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
        checkWin();
    }
}

function checkWin() {
    const flippedCards = document.querySelectorAll('.memoryCard.flipped');
    if (flippedCards.length === document.querySelectorAll('.memoryCard').length) {
        setTimeout(() => {
            alert("Winner, Winner, Chicken Dinner!");
            resetGame();
        }, 500);
    }
}

function resetGame() {
    memoryCards = [...cardValues, ...cardValues];
    memoryCards.sort(() => 0.5 - Math.random());

    flippedCards = [];
    lockBoard = false;

    const allCards = document.querySelectorAll('.memoryCard');
    allCards.forEach(card => {
        card.classList.remove('flipped'); // Entfernt die "flipped"-Klasse
    });

    createGameboard();
}

// TicTacToe
const tictactoeBoard = document.getElementById("tictactoe-board");
const board = Array(9).fill("");
let currentPlayer = "X";

function computerMove() {
    let emptyIndices = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyIndices.push(i);
        }
    }
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    board[randomIndex] = "O";
    updateBoard();
    checkTicTacToeWin();
    currentPlayer = "X";
}


function createTicTacToeBoard() {
    tictactoeBoard.innerHTML = "";

    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('tictactoe-cell');
        cellElement.dataset.index = index;
        cellElement.textContent = cell;

        cellElement.addEventListener('click', () => handleMove(index));

        tictactoeBoard.appendChild(cellElement);
    });
}

function handleMove(index) {
    if (board[index] === "" && currentPlayer === "X") {
        board[index] = "X";
        updateBoard();
        if (checkTicTacToeWin() === null) {
            currentPlayer = "O";
            setTimeout(computerMove, 500); // KI-Zug nach kurzer Pause
        } else {
            checkTicTacToeWin();
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.tictactoe-cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        if (board[index] !== "") {
            cell.classList.add('taken');
        }
    });
}

function checkTicTacToeWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setTimeout(() => {
                alert(`${board[a]} gewinnt!`);
                resetTicTacToe();
            }, 100);
            return board[a];
        }
    }

    if (!board.includes("")) {
        setTimeout(() => {
            alert("Unentschieden!");
            resetTicTacToe();
        }, 100);
        return 'tie';
    }

    return null;
}

function resetTicTacToe () {
    board.fill("");
    currentPlayer = "X";
    createTicTacToeBoard();
}

// Umschalten des Spiels
function showGame(game) {
    document.querySelectorAll('.game-container').forEach(container => {
        container.classList.remove('active');
    });

    if (game === "Memory") {
        document.getElementById('memory-container').classList.add('active');
    } else if (game === "Tic Tac Toe") {
        document.getElementById('tictactoe-container').classList.add('active');
    }
}

document.getElementById('memory-btn').addEventListener('click', () => showGame("Memory"));
document.getElementById('tictactoe-btn').addEventListener('click', () => showGame("Tic Tac Toe"));

createTicTacToeBoard();
createGameboard();