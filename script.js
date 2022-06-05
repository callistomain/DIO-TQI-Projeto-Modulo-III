const main = document.getElementsByTagName("main")[0];
const names = ["mario", "luigi", "bowser", "peach", "toad", "yoshi"];
let cards = [];

function createCard(name) {
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("img");

    front.src = `./img/${name}.png`;
    front.alt = "face da carta";
    front.classList.add("card-front");
    
    back.src = "./img/box.png";
    back.alt = "verso da carta";
    back.classList.add("card-back");
    
    card.classList.add("card");
    card.dataset.card = name;
    card.appendChild(front);
    card.appendChild(back);
    
    main.appendChild(card);
    cards.push(card);
}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

const deckSize = 12;

for (let i = 0; i < deckSize/2; i++) {
    createCard(names[i]);
    createCard(names[i]);
}

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * deckSize);
        card.style.order = randomPosition;
    });
})();

cards.forEach(card => {
    card.addEventListener("click", flipCard)
});
