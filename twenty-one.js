const readline = require('readline-sync');

const SUITS = ["H", "S", "D", "C"]; 
const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const FULL_DECK_CARDS = createDeck()



//creates nested array of full deck of cards 
function createDeck() {
  let deck = [];

  for (let i = 0; i < SUITS.length; i++) {
    for (let j = 0; j < CARDS.length; j++) {
      deck.push([SUITS[i], CARDS[j]]);
    }
  }

  return deck; 
}

//shuffles an array 
function shuffle(array) {
  for (let ind = array.length - 1; ind > 0; ind--) {
    let otherInd = Math.floor(Math.random() * (ind + 1));
    [array[ind], array[otherInd]] = [array[otherInd], array[ind]]; //swaps elements
  }

  return array;
}

shuffle(FULL_DECK_CARDS);







function total(FULL_DECK_CARDS) {
  let values = FULL_DECK_CARDS.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (["J", "Q", "K"].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  })

  //correction for Aces
  values.filter(value => value === "A").forEach(_ => { //? 
    if (sum > 21) {
      sum -= 10;
    }
  })

  return sum
}

console.log(total(FULL_DECK_CARDS));


// greets player
function greeting() {
  printMessage(
    "Welcome to the game of Twenty-One! Let's play!",
  );
}

// says goodbye to player
function farewell() {
  printMessage('Thanks for playing Twenty-One! Au Revoir!');
}

// displays messages to player with arrow
function printMessage(message) {
  console.log(`=> ${message}`);
}