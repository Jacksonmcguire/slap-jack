var rulesControlsView = document.querySelector('.rules-controls-view');
var deckContainer = document.querySelector('.deck-container');
var player1Hand = document.getElementById('player1');
var player2Hand = document.getElementById('player2');
var player1HandContainer = document.getElementById('player1Container');
var player2HandContainer = document.getElementById('player2Container');
var middleDeckContainer = document.querySelector('.middle-deck-container');
var player1Wins = document.getElementById('player1Wins');
var player2Wins = document.getElementById('player2Wins');
var slapText = document.querySelector('.slap-message');
var newGameButton = document.getElementById('newGameButton');
var rulesControlsButton = document.getElementById('rulesAndControls');
var newGame = new Game();

window.addEventListener('load', loadPage);
document.addEventListener('keydown', playerAction);
newGameButton.addEventListener('click', startGame);
rulesControlsButton.addEventListener('click', showRules);

function changeSlapText(result, text) {
  slapText.innerText = `${result.toUpperCase()}! ${text}`;
};

function loadPage() {
  finishGame();
  toggleButtons();
};

function showStartPage() {
  deckContainer.classList.remove('hidden');
  toggleButtons();
};

function toggleButtons() {
  newGameButton.classList.toggle('hidden');
  rulesControlsButton.classList.toggle('hidden');
};

function showRules() {
  deckContainer.classList.add('hidden');
  rulesControlsView.classList.remove('hidden');
  rulesControlsButton.classList.add('hidden');
};

function startGame() {
  if(deckContainer.classList.contains('hidden')) {
    deckContainer.classList.remove('hidden');
    rulesControlsView.classList.add('hidden');
  }
  changeVisibility([player1Hand, player2Hand], 'show')
  toggleButtons();
  newGame.dealHands();
};

function changeVisibility(arr, change) {
  for (var i = 0; i < arr.length; i++) {
    if(change === 'hide') {
      arr[i].classList.add('visibility-hidden');
    } else if(change === 'show') {
      arr[i].classList.remove('visibility-hidden');
    }
  }
};

function finishGame() {
  toggleButtons();
  middleDeckContainer.innerHTML = `<img></img`;
  var player1 = sessionStorage.getItem(`${newGame.player1.id}`);
  var player2 = sessionStorage.getItem(`${newGame.player2.id}`);
  if(player1 !== null || player2 !== null) {
    player1Wins.innerText = `${player1 || 0} wins`;
    player2Wins.innerText = `${player2 || 0} wins`;
  }
};

function determineWinner() {
  if(newGame.player1.hand.length === 0 && newGame.player1.lastStand === true) {
    newGame.win(newGame.player2);
    slapText.innerText += ' Player 2 wins!';
    finishGame();
  } else if(newGame.player2.hand.length === 0 && newGame.player2.lastStand === true) {
    newGame.win(newGame.player1);
    slapText.innerText += ' Player 1 wins!';
    finishGame();
  }
};

function playerSlap(eventKey) {
  if(eventKey === 'f') {
    var slapResult = newGame.slap(newGame.player1);
    slapMessage(slapResult, newGame.player1);
    changeMiddleCard(newGame.deck, middleDeckContainer);
    determineWinner();
  } else {
    var slapResult = newGame.slap(newGame.player2);
    slapMessage(slapResult, newGame.player2);
    changeMiddleCard(newGame.deck, middleDeckContainer);
    determineWinner();
  }
};

function changeMiddleCard(deck, deckContainer) {
  if(deck[0] === undefined) {
    middleDeckContainer.innerHTML = `<img></img`;
    return false;
  } else if(newGame.player1.lastStand === true) {
    player1Hand.classList.add('visibility-hidden');
  } else if(newGame.player2.lastStand === true) {
    player2Hand.classList.add('visibility-hidden');
  }
  var topCard = deck[0];
  deckContainer.innerHTML =
  `<img class="middle-deck" src="assets/${topCard}.png" alt="${topCard}"></img>`;
};

function playerAction(event) {
  if(event.key === 'q' && newGame.currentPlayer === newGame.player1 && newGame.player1.lastStand === false) {
    newGame.dealToMiddle();
    changeVisibility([slapText], 'hide'); changeMiddleCard(newGame.deck, middleDeckContainer);
  } else if(event.key === 'p' && newGame.currentPlayer === newGame.player2 && newGame.player2.lastStand === false) {
    newGame.dealToMiddle();
    changeVisibility([slapText], 'hide'); changeMiddleCard(newGame.deck, middleDeckContainer);
    document.querySelector('.middle-deck').classList.add('player-2');
  } else if(event.key === 'f' || event.key === 'j') {
    playerSlap(event.key);
  } else if((event.key === 'q' || event.key === 'p') && (newGame.player1.lastStand === true || newGame.player2.lastStand === true)) {
    newGame.dealToMiddle();
  }
};

function createCardVariables(color) {
  var deck = []; var currentCard = '';
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
  };
  return deck;
};

function slapMessage(result, player) {
  if(result === '2' || result === '1') {
    changeSlapText('Bad slap', `Player ${result} has no cards to forfeit!`); changeVisibility([slapText], 'show');
    determineWinner();
  } else if(player === newGame.player1 && result !== 'Bad Slap') {
    changeSlapText(result, 'Player 1 takes the pile!'); changeVisibility([slapText, player1Hand], 'show');
  } else if(player === newGame.player2 && result !== 'Bad Slap') {
    changeSlapText(result, 'Player 2 takes the pile!'); changeVisibility([slapText, player2Hand], 'show');
  } else if(result === 'Bad Slap' && player === newGame.player1) {
    changeSlapText(result, 'Player 1 forfeits a card to Player 2!'); changeVisibility([slapText, player2Hand], 'show');
    newGame.player2.lastStand = false;
  } else if(result === 'Bad Slap' && player === newGame.player2) {
    changeSlapText(result, 'Player 2 forfeits a card to Player 1!'); changeVisibility([slapText, player1Hand], 'show');
    newGame.player1.lastStand = false;
  }
};
