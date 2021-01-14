// Query Selectors

// Event Listeners

// Functions

function createCardVariables(color) {
  var deck = [];
  var currentCard = '';
  for(var i = 0; i < 13; i ++) {
    if(i < 10) {
      currentCard = color + (i + 1);
      deck.push(currentCard);
    } else if(i === 10) {
      currentCard = color + 'Jack';
      deck.push(currentCard);
    } else if(i === 11) {
      currentCard = color + 'Queen';
      deck.push(currentCard);
    } else if(i === 12) {
      currentCard = color + 'King';
      deck.push(currentCard);
    }
  }
  return deck;
}
