class Player {
  constructor(id) {
    this.id = id;
    this.wins = 0;
    this.hand = [];
    this.lastStand = false;
  }

  playCard(game) {
    if (this.hand.length > 0) {
      var activeCard = this.hand.shift();
      game.deck.unshift(activeCard);
    }
  };
  
  saveWinsToStorage() {
    var winCount = sessionStorage.getItem(`${this.id}`);
    winCount ++;
    sessionStorage.setItem(`${this.id}`, winCount || this.wins);
  };
};
