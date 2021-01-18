// Query Selectors
var middleDeckContainer = document.querySelector('.middle-deck-container');
var deckContainer = document.querySelector('.deck-container');
var player1Hand = document.getElementById('player1');
var player2Hand = document.getElementById('player2');
var player1HandContainer = document.getElementById('player1Container');
var player2HandContainer = document.getElementById('player2Container');
var slapText = document.querySelector('.slap-message');
var newGameButton = document.getElementById('newGameButton');
var newGame = new Game();
var player1Wins = document.getElementById('player1Wins');
var player2Wins = document.getElementById('player2Wins');
var rulesControlsButton = document.getElementById('rulesAndControls');
var rulesControlsView = document.querySelector('.rules-controls-view');
// Event Listeners
document.addEventListener('keydown', playerAction);
newGameButton.addEventListener('click', startGame);
rulesControlsButton.addEventListener('click', showRules);


// Functions

function determineWinner() {
  if(newGame.player1.hand.length === 0 && newGame.player1.lastStand === false) {
    newGame.player1.lastStand = true;
    slapText.innerText = 'Last stand for player 1';
  } else if(newGame.player2.hand.length === 0 && newGame.player2.lastStand === false) {
    newGame.player2.lastStand = true;
    slapText.innerText = 'Last stand for player 2';
  } else if(newGame.player1.hand.length === 0 && newGame.player1.lastStand === true) {
    newGame.win(newGame.player2);
    slapText.innerText = 'WOOOHOOOO! Player 2 wins!';
  } else if(newGame.player2.hand.length === 0 && newGame.player2.lastStand === true) {
    newGame.win(newGame.player1);
    slapText.innerText = 'WOOOHOOOO! Player 1 wins!';
  }
}

function createCardVariables(color) {
  var deck = [];
  var currentCard = '';
  for(var i = 0; i < 13; i ++) {
    if(i < 9) {
      currentCard = color + `-0${i + 1}`;
    } else if(i === 9) {
      currentCard = color + `-${i + 1}`;
    } else if(i === 10) {
      currentCard = color + '-jack';
    } else if(i === 11) {
      currentCard = color + '-queen';
    } else if(i === 12) {
      currentCard = color + '-king';
    }
    deck.push(currentCard);
  }
  return deck;
}

function playerSlap(eventKey) {
  if(eventKey === 'f') {
    slapMessage(newGame.slap(newGame.player1), newGame.player1);
    newGame.slap(newGame.player1);
    changeMiddleCard(newGame.deck, middleDeckContainer);
    determineWinner();
  } else {
    var slapResult = newGame.slap(newGame.player2);
    slapMessage(slapResult, newGame.player2);
    changeMiddleCard(newGame.deck, middleDeckContainer);
    determineWinner();
  }
}

function playerAction(event) {
  if(event.key === 'q' && newGame.currentPlayer === newGame.player1 && newGame.player1.lastStand === false) {
    newGame.dealToMiddle();
    slapText.classList.add('visibility-hidden');
    changeMiddleCard(newGame.deck, middleDeckContainer);
  } else if(event.key === 'p' && newGame.currentPlayer === newGame.player2 && newGame.player2.lastStand === false) {
    newGame.dealToMiddle();
    slapText.classList.add('visibility-hidden');
    changeMiddleCard(newGame.deck, middleDeckContainer);
    document.querySelector('.middle-deck').classList.add('player-2');
  } else if(event.key === 'f' || event.key === 'j') {
    playerSlap(event.key);
  } else if((event.key === 'q' || event.key === 'p') && (newGame.player1.lastStand === true || newGame.player2.lastStand === true)) {
    newGame.dealToMiddle();
  }
}

function changeMiddleCard(deck, deckContainer) {
  if(deck[0] === undefined) {
    middleDeckContainer.innerHTML = `<img></img`;
    return false;
  }
  var topCard = deck[0];
  deckContainer.innerHTML =
  `<img class="middle-deck" src="assets/${topCard}.png" alt="${topCard}"></img>`
}

function slapMessage(result, player) {
  if(player === newGame.player1 && result !== 'Bad Slap') {
    slapText.innerText = `${result.toUpperCase()}! Player 1 takes the pile!`;
    slapText.classList.remove('visibility-hidden');
  } else if(player === newGame.player2 && result !== 'Bad Slap') {
    slapText.innerText = `${result.toUpperCase()}! Player 2 takes the pile!`;
    slapText.classList.remove('visibility-hidden');
  }
  else if(result === 'Bad Slap' && player === newGame.player1) {
    slapText.innerText = `${result.toUpperCase()}! Player 1 forfeits a card to Player 2!`;
    slapText.classList.remove('visibility-hidden');
  } else if(result === 'Bad Slap' && player === newGame.player2) {
    slapText.innerText = `${result.toUpperCase()}! Player 2 forfeits a card to Player 1!`;
    slapText.classList.remove('visibility-hidden');
  }
  }
function showStartPage() {
  deckContainer.classList.remove('hidden');
  rulesControlsButton.classList.remove('hidden');
  newGameButton.classList.remove('hidden');
}

function startGame() {
  if(deckContainer.classList.contains('hidden')) {
    deckContainer.classList.remove('hidden');
    rulesControlsView.classList.add('hidden');
  }
  newGameButton.classList.add('hidden');
  rulesControlsButton.classList.add('hidden');
  newGame.dealHands();
  var player1 = localStorage.getItem(`${newGame.player1.id}`);
  var player2 = localStorage.getItem(`${newGame.player2.id}`);
  player1Wins.innerText = player1;
  player2Wins.innerText = player2;
}

function showRules() {
  deckContainer.classList.add('hidden');
  rulesControlsView.classList.remove('hidden');
  rulesControlsButton.classList.add('hidden');
}
