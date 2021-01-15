class Player {
  constructor() {
    this.id = Date.now();
    this.wins = 0;
    this.hand = [];
  }
  playCard(game) {
    if(this.hand.length > 0) {
      var activeCard = this.hand.shift();
      game.deck.unshift(activeCard);
    }
  }
  saveWinsToStorage() {
    localStorage.setItem(`${this.id}`, this.wins);
  }
}
