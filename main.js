// Query Selectors
var middleDeckContainer = document.querySelector('.middle-deck-container');
var player1Hand = document.getElementById('player1');
var player2Hand = document.getElementById('player2');
var player1HandContainer = document.getElementById('player1Container');
var player2HandContainer = document.getElementById('player2Container');
var newGameButton = document.getElementById('newGameButton');
var newGame = new Game();
// Event Listeners
document.addEventListener('keydown', playerAction);
newGameButton.addEventListener('click', startGame);


// Functions

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
    newGame.slap(newGame.player1);
    changeMiddleCard(newGame.deck, middleDeckContainer);
  } else {
    newGame.slap(newGame.player2);
    changeMiddleCard(newGame.deck, middleDeckContainer);
  }
}

function playerAction(event) {
  if(event.key === 'q' && newGame.currentPlayer === newGame.player1) {
    newGame.dealToMiddle();
    changeMiddleCard(newGame.deck, middleDeckContainer);
  } else if(event.key === 'p' && newGame.currentPlayer === newGame.player2) {
    newGame.dealToMiddle();
    changeMiddleCard(newGame.deck, middleDeckContainer);
    document.querySelector('.middle-deck').classList.add('player-2');
  } else if(event.key === 'f' || event.key === 'j') {
    playerSlap(event.key);
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

function slapMessage() {

}

function startGame() {
  newGame.dealHands();
}
