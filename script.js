const gameboard = document.getElementById("game-board");
let cardValues = ["a", "b", "c", "d", "e", "f", "g", "h"];
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
        memoryFront.innerText = value;

        const memoryBack = document.createElement('div');
        memoryBack.classList.add('memoryBack');
        memoryBack.innerText = "?";

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
        const cardMemory1Value = cardMemory1.innerText;
        const cardMemory2Value = cardMemory2.innerText;

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

createGameboard()