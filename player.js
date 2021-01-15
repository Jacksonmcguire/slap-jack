class Player {
  constructor() {
    this.id = Math.floor(Math.random() * 1000);
    this.wins = 0;
    this.hand = [];
    this.lastStand = false;
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
