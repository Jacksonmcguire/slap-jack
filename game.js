class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.deck = (createCardVariables('blue') + `,${createCardVariables('gold')}` + `,${createCardVariables('green')}` + `,${createCardVariables('red')}`).split(',');
    this.currentPlayer;
  }
  shuffle(deck) {
    var shuffleDeck = [];
    for(var i = 0; i < this.deck.length; i++) {
      var beingShuffled = getRandomElement(this.deck);
      shuffleDeck.push(beingShuffled);
    }
    this
    this.deck = shuffleDeck;
  }
}
