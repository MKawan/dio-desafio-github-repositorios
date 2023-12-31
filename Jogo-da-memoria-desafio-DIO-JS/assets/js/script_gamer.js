const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//função de virar os cards
function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("flip");
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//funcção que checar quando os card são iguais.
function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disabledCards();
        return;
    }
    unflipCards();
}

//funcao que desabilita as cartas.
function disabledCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//funcao que reseta o tabuleiro
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//funcao que embaralha os cards
(function shuffle(){
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 16);
        card.style.order = ramdomPosition;
    })

})();
//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});
