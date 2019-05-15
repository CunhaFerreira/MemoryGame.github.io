const cardsArray = [
    'fa fa-anchor', 'fa fa-anchor', 'fa fa-bicycle', 'fa fa-bicycle',
    'fa fa-bolt', 'fa fa-bolt', 'fa fa-bomb', 'fa fa-bomb',
    'fa fa-cube', 'fa fa-cube', 'fa fa-diamond', 'fa fa-diamond',
    'fa fa-leaf', 'fa fa-leaf', 'fa fa-plane', 'fa fa-plane'
];

const deck = document.querySelector('.deck');
const movesContainer = document.querySelector('.moves');
const starsContainer = document.querySelector('.stars');
const time = document.querySelector('.time');
const modal = document.querySelector('.modalContent');
const message = document.querySelector('.message');
const playAgain = document.querySelector('.playAgain');
const restartBtn = document.querySelector('.restart');


let openedCard = [];
let matchedCards = [];
let unmatchedCards = [];
let moves = 0;
let minutes = 0;
let seconds = 0;
let startGame = 0;
let gameInterval;



/*
 * Initialize Game
 */
function initCardGame() {
    // Invoke shuffle function
    shuffle(cardsArray);

    // Create card's tag&classes
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class='${cardsArray[i]}'></i>`;
        deck.appendChild(card);

        // Invoke click event to each card
        clickCard(card);
    }
}


/*
 * Array Cards Randomly from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * Click on Card Event
 */
function clickCard(card) {
    card.addEventListener('click', function () {
        const currentCard = this;
        const previousCard = openedCard[0];

        // First click the time begins
        if (startGame === 0) {
            setTimer();
            startGame++;
        }

        // Existing open card
        if (openedCard.length === 1) {
            // Add new classes when clicked and disable cursor after 1º click
            card.classList.add('open', 'show', 'disable');
            openedCard.push(this);

            // Invoke the comparision function
            matched(currentCard, previousCard);
            unmatched(currentCard, previousCard);

            // Add moves
            movesCounter();

        } else {
            currentCard.classList.add('open', 'show', 'disable');
            openedCard.push(this);
        }
    });
}


/*
 * Compare if Cards Match
 */
function matched(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        matchedCards.push(currentCard, previousCard);
        // Clear array
        openedCard = [];

        gameOver();

    } else {
        setTimeout(function () {
            currentCard.classList.remove('open', 'show', 'disable', 'unmatch');
            previousCard.classList.remove('open', 'show', 'disable', 'unmatch');
            // Set timer to see the cards before flip
        }, 500);
        // Clear array
        openedCard = [];
    }
}


/*
 * Compare if Cards don't Match
 */
function unmatched(currentCard, previousCard) {
    if (currentCard.innerHTML !== previousCard.innerHTML) {
        currentCard.classList.add('unmatch');
        previousCard.classList.add('unmatch');

        unmatchedCards.push(currentCard, previousCard);
        openedCard = [];
    }
}


/*
 * Moviments Counter
 */
movesContainer.innerHTML = `0 Moves`;

function movesCounter() {
    moves++;
    movesContainer.innerHTML = `${moves} Moves`;
    // Set rating
    rating();
}


/*
 * Stars Based on Moviments
 */
starsContainer.innerHTML = `<li><i class='fa fa-star'></i></li>
 <li><i class='fa fa-star'></i></li>
 <li><i class='fa fa-star'></i></li>`;

function rating() {
    switch (moves) {
        case 15:
            starsContainer.innerHTML = `<li><i class='fa fa-star'></i></li>
                                        <li><i class='fa fa-star'></i></li>`;
            break;

        case 20:
            starsContainer.innerHTML = `<li><i class='fa fa-star'></i></li>`;
            break;

    }

}


/*
 * Set Timer from https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
 */
function setTimer() {

    gameInterval = setInterval(function () {
        seconds = parseInt(seconds, 10) + 1;
        minutes = parseInt(minutes, 10);
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        time.innerHTML = `${minutes}:${seconds}`;

    }, 1000);
}


/*
 * Stop Timer
 */
function stopTimer() {
    clearInterval(gameInterval);
}


/*
 * Check if the Game is Over
 */
function gameOver() {
    if (matchedCards.length === cardsArray.length) {
        stopTimer();
        showModal() = setTimeout(300);
    }
}


/*
 * Reset the Game
 */
function resetGame() {
    // Reset any related variables
    deck.innerHTML = '';
    openedCard = [];
    matchedCards = [];
    unmatchedCards = [];
    minutes = 0;
    seconds = 0;
    movesContainer.innerHTML = `0 Moves`;
    moves = 0;
    startGame = 0;
    time.innerHTML = `00:00`;
    starsContainer.innerHTML = `<li><i class='fa fa-star'></i></li>
                                <li><i class='fa fa-star'></i></li>
                                <li><i class='fa fa-star'></i></li>`;
    hideModal();
    initCardGame();

}


/*
 * Show Modal
 */
function showModal() {
    modal.classList.remove('hide');
    message.innerHTML = `You got ${starsContainer.innerHTML} star(s)<br>
    Your time was ${minutes}:${seconds}<br> with ${moves} moves`;
}


/*
 * Hide Modal
 */
function hideModal() {
    modal.classList.add('hide');
}


playAgain.addEventListener('click', function () {
    resetGame();
    hideModal();
});


/*
 * Restart Button
 */
restartBtn.addEventListener('click', function () {
    stopTimer();
    resetGame();
    hideModal();
});


initCardGame();
