class Player {
  constructor() {
    this.id = Date.now();
    this.wins;
    this.hand = [];
  }
  playCard(game) {
    if(this.hand.length > 0) {
      var activeCard = this.hand.shift();
      game.deck.push(activeCard);
    }
  }
  saveWinsToStorage() {
    localStorage.setItem(`${this.id}`, this.wins);
  }
}
