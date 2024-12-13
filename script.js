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

createGameboard()