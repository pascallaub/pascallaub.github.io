const gameboard = document.getElementById("game-board");
const cardValues = ["a", "b", "c", "d", "e", "f", "g", "h"];
const memoryCards = [...cardValues, ...cardValues];

memoryCards.sort(() => 0.5 - Math.random());

function createGameboard() {
    memoryCards.forEach((value, index) => {
        const memoryCard = document.createElement('div');
        memoryCard.innerText = value;
        memoryCard.classList.add('memoryCard')
        memoryCard.addEventListener('click', () => flipMemory(memoryCard));
        gameboard.appendChild(memoryCard)
    })
}

function flipMemory() {
    
}

createGameboard()