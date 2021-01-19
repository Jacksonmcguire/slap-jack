class Game {
  constructor() {
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Player 2');
    this.deck = (createCardVariables('blue') + `,${createCardVariables('gold')}` + `,${createCardVariables('green')}` + `,${createCardVariables('red')}`).split(',');
    this.currentPlayer = this.player1;
  }
  
  win(player) {
    player.wins ++;
    player.saveWinsToStorage();
    this.reset();
  };

  changeCurrentPlayer() {
    if (this.currentPlayer === this.player1 && this.player2.lastStand !== true) {
      this.currentPlayer = this.player2;
    } else if (this.currentPlayer === this.player2 && this.player1.lastStand !== true) {
      this.currentPlayer = this.player1;
    }
  };

  dealOneHand(player) {
    this.shuffle(this.deck);
    for(var i = 0; i < this.deck.length; i++) {
      player.hand.push(this.deck[i]);
    }
    this.deck = [];
  };

  shuffle(deck) {
    for(var i = 0; i < deck.length; i++) {
      var randomInt = Math.floor(Math.random() * deck.length);
      var temporaryInt = deck[i];
      deck[i] = deck[randomInt];
      deck[randomInt] = temporaryInt;
    }
  };

  reset() {
    this.deck = (createCardVariables('blue') + `,${createCardVariables('gold')}` + `,${createCardVariables('green')}` + `,${createCardVariables('red')}`).split(',');
    this.player1.hand = [];
    this.player2.hand = [];
    this.player1.lastStand = false;
    this.player2.lastStand = false;
    this.currentPlayer = this.player1;
  };

  dealHands() {
    this.shuffle(this.deck);
    for(var i = 0; i < this.deck.length; i++) {
      if (i % 2 === 0) {
        this.player1.hand.push(this.deck[i]);
      } else {
        this.player2.hand.push(this.deck[i]);
    }
    }
    this.deck = [];
  };

  trackCentralDeck() {
    if (this.deck[0] !== undefined && this.deck[0].includes('jack')) {
      return 'SlapJack';
    } else if (this.deck.length > 1 && this.deck[0].slice(-1) === this.deck[1].slice(-1)) {
      return 'Doubles'
    } else if (this.deck.length > 2 && this.deck[0].slice(-1) === this.deck[2].slice(-1)) {
      return 'Sandwich';
    } else if (this.player1.lastStand !== true && this.player2.lastStand !== true) {
      return 'Bad Slap';
    } else if ((this.player1.lastStand !== true || this.player2.lastStand !== true)){
      return `someones empty`;
    }
  };

  dealToMiddle() {
    if (this.currentPlayer.hand.length > 0) {
      this.currentPlayer.playCard(this);
      this.changeCurrentPlayer();
    } else if (this.deck.length === 52 && this.currentPlayer.lastStand === false) {
      this.dealOneHand(this.currentPlayer);
      this.currentPlayer.playCard(this);
    } else if (this.player1.hand.length === 0 && this.player2.hand.length === 0) {
      this.dealHands();
    } else if (this.currentPlayer.hand.length === 0) {
      this.currentPlayer.lastStand = true;
      this.changeCurrentPlayer();
      this.currentPlayer.playCard(this);
    }
  };

  slapLastStand(player) {
    var firstCard = player.hand.shift();
    if (this.player1.lastStand === true && this.player1 !== player) {
      this.currentPlayer = this.player1; this.currentPlayer.hand.push(firstCard);
      return 'Bad Slap';
    } else if (this.player2.lastStand === true && this.player2 !== player) {
      this.currentPlayer = this.player2; this.currentPlayer.hand.push(firstCard);
      return 'Bad Slap';
    } else if (this.player1.lastStand === true && this.player1 === player) {
      return '1';
    } else if (this.player2.lastStand === true && this.player2 === player) {
      return '2';
    }
  };
  
  slap(player) {
    this.currentPlayer = player;
    if (this.trackCentralDeck() === 'SlapJack') {
      player.hand = player.hand.concat(this.deck);
      player.lastStand = false; this.deck = [];
      return `SlapJack`;
    } else if ((this.trackCentralDeck() === 'Doubles' || this.trackCentralDeck() === 'Sandwich') && this.player1.lastStand === false && this.player2.lastStand === false) {
      var slapResult = this.trackCentralDeck();
      player.hand = player.hand.concat(this.deck); this.deck = [];
      return `${slapResult}`;
    } else if (this.trackCentralDeck() === 'Bad Slap') {
      var firstCard = player.hand.shift();
      this.changeCurrentPlayer(); this.currentPlayer.hand.push(firstCard);
      return `Bad Slap`;
    } else {
      var result = this.slapLastStand(player);
      return result;
    }
  };
};
