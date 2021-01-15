class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.deck = (createCardVariables('blue') + `,${createCardVariables('gold')}` + `,${createCardVariables('green')}` + `,${createCardVariables('red')}`).split(',');
    this.currentPlayer = this.player1;
  }
  shuffle() {
    for(var i = 0; i < this.deck.length; i++) {
      var randomInt = Math.floor(Math.random() * this.deck.length);
      var temporaryInt = this.deck[i];
      this.deck[i] = this.deck[randomInt];
      this.deck[randomInt] = temporaryInt;
    }
  }

  trackCentralDeck() {
    return this.deck[0];
  }

  dealToMiddle() {
    this.currentPlayer.playCard(this);
    if(this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
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
    if(this.deck[0].includes('Jack')) {
      player.hand = player.hand.concat(this.deck);
      this.deck = [];
      console.log('SlapJack');
    } else if(this.deck[0].slice(-1) === this.deck[1].slice(-1)) {
      player.hand = player.hand.concat(this.deck);
      this.deck = [];
      console.log('Doubles!');
    } else if(this.deck[0].slice(-1) === this.deck[2].slice(-1)) {
      player.hand = player.hand.concat(this.deck);
      this.deck = [];
      console.log('Sandwich');
    }
  }
  win(player) {
    player.wins ++;
  }
}
