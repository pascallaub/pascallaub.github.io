const gameboard = document.getElementById("game-board");
const cardValues = ["a", "b", "c", "d", "e", "f", "g", "h"];
const memoryCards = [...cardValues, ...cardValues];

memoryCards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let lockBoard = false;

function createGameboard() {
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
        gameboard.appendChild(memoryCard)
    })
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
    }
}

createGameboard()