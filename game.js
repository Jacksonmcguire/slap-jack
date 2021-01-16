class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.deck = (createCardVariables('blue') + `,${createCardVariables('gold')}` + `,${createCardVariables('green')}` + `,${createCardVariables('red')}`).split(',');
    this.currentPlayer = this.player1;
  }
  shuffle(deck) {
    for(var i = 0; i < deck.length; i++) {
      var randomInt = Math.floor(Math.random() * deck.length);
      var temporaryInt = deck[i];
      deck[i] = deck[randomInt];
      deck[randomInt] = temporaryInt;
    }
  }

  trackCentralDeck() {
    if(this.deck[0] !== undefined && this.deck[0].includes('jack')) {
      console.log('hello')
      return 'SlapJack';
    } else if(this.deck.length > 1 && this.deck[0].slice(-1) === this.deck[1].slice(-1)) {
      return 'Doubles'
    } else if(this.deck.length > 2 && this.deck[0].slice(-1) === this.deck[2].slice(-1)) {
      return 'Sandwich';
    } else {
      return 'Bad Slap';
  }
}

  changeCurrentPlayer() {
    if(this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  dealToMiddle() {
    if(this.currentPlayer.hand.length < 0) {
      this.currentPlayer.playCard(this);
      this.changeCurrentPlayer();
    } else {
      this.changeCurrentPlayer();
      this.currentPlayer.playCard(this);
    }
  }

  dealHands() {
    this.shuffle(this.deck)
    for(var i = 0; i < this.deck.length; i++) {
      if(i % 2 === 0) {
        this.player1.hand.push(this.deck[i]);
      } else {
        this.player2.hand.push(this.deck[i]);
      }
    }
    this.deck = [];
  }

  slap(player) {
    this.currentPlayer = player;
    if(this.trackCentralDeck() === 'SlapJack') {
      player.hand = player.hand.concat(this.deck);
      this.deck = [];
      return 'SlapJack';
    } else if(this.trackCentralDeck() === 'Doubles' || this.trackCentralDeck() === 'Sandwich') {
      player.hand = player.hand.concat(this.deck);
      this.deck = [];
      return `${this.trackCentralDeck()}`
    } else if(this.trackCentralDeck() === 'Bad Slap') {
      var firstCard = player.hand.shift();
      this.changeCurrentPlayer();
      this.currentPlayer.hand.push(firstCard);
      return false;
    }
  }

  reset() {
    this.deck = (createCardVariables('blue') + `,${createCardVariables('gold')}` + `,${createCardVariables('green')}` + `,${createCardVariables('red')}`).split(',');
    this.player1.hand = [];
    this.player2.hand = [];
    this.dealHands();
  }

  win(player) {
      player.wins ++;
      player.saveWinsToStorage();
      player.lastStand = false;
    }
  }
