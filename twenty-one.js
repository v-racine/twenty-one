const readline = require('readline-sync');

const SUITS = ["H", "S", "D", "C"]; 
const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const FULL_DECK_CARDS = createDeck()

const BUST = 21;

/*MAIN GAME FUNCTION*/

function playTwentyOne () {
  greeting();

  let anotherGame = "y";
  while (anotherGame[0] === "y") {

  const shuffledCards = shuffle(FULL_DECK_CARDS);
  const playerCards = initialDealForPlayer(shuffledCards);
  const dealerCards = initialDealForDealer(shuffledCards)

  displayInitialDeal(playerCards, dealerCards);

  playerTurn(playerCards, dealerCards, shuffledCards);
  dealerTurn(playerCards, dealerCards, shuffledCards);
  stays(playerCards, dealerCards);

  anotherGame = playAgain(anotherGame);
  console.clear();
  }

  farewell(); 

}

playTwentyOne();

/*HELPER FUNCTIONS*/


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

//test:
//const shuffledCards = shuffle(FULL_DECK_CARDS);

//determines initial deal of cards for player and dealer, respectively
function initialDealForPlayer(deck) {
  let playerCards = [];
   
  playerCards.push(...popTwoFromDeck(deck));

  return playerCards;
}

function initialDealForDealer(deck) {
  let dealerCards = [];
  dealerCards.push(...popTwoFromDeck(deck));

  return dealerCards;
}
//tests
// console.log(initialDealForPlayer(shuffledCards));
// console.log(initialDealForDealer(shuffledCards));

// const playerCards = initialDealForPlayer(shuffledCards);
// const dealerCards = initialDealForDealer(shuffledCards);

//display initial deal of cards to player 
function displayInitialDeal(playerCards, dealerCards) {
  printMessage(`Dealer has ${dealerCards[0]} and ?`);
  printMessage(`You have: ${playerCards[0]} and ${playerCards[1]}, for a total of ${total(playerCards)}.`);
}
//test
// console.log(displayInitialDeal(playerCards, dealerCards));
//displayInitialDeal(playerCards, dealerCards);

//determines player's choice
function determinePlayerChoice() {
  let playerChoice;
    while (true) {
      printMessage("Would you like to [h]it or [s]tay?");
      playerChoice = readline.question().toLocaleLowerCase();
      if (["h", "s"].includes(playerChoice)) break;
      printMessage("Sorry, that's not a valid choice. Please choose 'h' or 's'.")
    }
  return playerChoice;
}

//test
//let playerChoice = determinePlayerChoice();

//determines player's moves
function playerTurn(playerCards, dealerCards, deck) {
  while (true) {
   
    let playerChoice = determinePlayerChoice();
    
    if (playerChoice === "h") {
      playerCards.push(deck.pop());
      printMessage("You chose to hit!");
      printMessage(`Your cards are now ${hand(playerCards)}`);
      printMessage(`Your total is now: ${total(playerCards)}`)
    } 

    if (playerChoice === "s" || busted(playerCards)) break;
  }

  if (busted(playerCards)) {
    displayResults(playerCards, dealerCards);
  } else {
    printMessage(`You stayed at ${total(playerCards)}.`);
  }
} 

//test:
//playerTurn(playerCards, dealerCards, shuffledCards);

//determines dealer's move
function dealerTurn(playerCards, dealerCards, deck) {
  if (!busted(playerCards)) {

  printMessage("Dealer turn...");

  while (total(dealerCards) < 17) {
    printMessage("Dealer hits!");
    dealerCards.push(deck.pop())
    printMessage(`Dealer's cards are now: ${hand(dealerCards)}`)
  }

  if (busted(dealerCards)) {
    printMessage(`Dealer's total is now ${total(dealerCards)}`);
    //displayResults(playerCards, dealerCards);
  } else {
    printMessage(`Dealer stays at ${total(dealerCards)}`);
  }

  }  
}

//test:
//dealerTurn(playerCards, dealerCards, shuffledCards);

function stays(playerCards, dealerCards) {
  console.log('==============');
  printMessage(`Dealer has ${dealerCards}, for a total of: ${total(dealerCards)}`);
  printMessage(`Player has ${playerCards}, for a total of: ${total(playerCards)}`);
  console.log('==============');

  displayResults(playerCards, dealerCards);
}

//test:
//stays(playerCards, dealerCards);


//HELPERS for HELPER FUNCTIONS: 

//sums total score of cards 
function total(cards) {
  let values = cards.map(card => card[1]);

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
    if (sum > BUST) {
      sum -= 10;
    }
  })

  return sum
}

//tests:
//console.log(total(FULL_DECK_CARDS));


//determines when card score total exceeds 21; returns boolean
function busted(cards) {
  return total(cards) > BUST;
}

//determines winner of one game 
function determineResult(playerHand, dealerHand) {
  let playerTotal = total(playerHand);
  let dealerTotal = total(dealerHand);

    if(playerTotal > BUST) {
      return 'PLAYER_BUSTED';
    } else if (dealerTotal > BUST) {
      return 'DEALER_BUSTED'; 
    } else if (dealerTotal < playerTotal) {
      return 'PLAYER';
    } else if (dealerTotal > playerTotal) {
      return 'DEALER';
    } else {
      return 'TIE';
    }
  }  

//tests: 
//  let playerHand = [[ 'H', 'Q' ],  [ 'S', 'A' ]];
//  let dealerHand = [[ 'S', 'Q' ],  [ 'C', 'K' ], ["C", "10"]];
//   console.log(determineResult(playerHand,dealerHand)); 

function displayResults(playerHand, dealerHand) {
  let result = determineResult(playerHand, dealerHand);

  switch(result) {
    case 'PLAYER_BUSTED':
    printMessage('You busted! Dealer wins!');
    break;
  case 'DEALER_BUSTED':
    printMessage('Dealer busted! You win!');
    break;
  case 'PLAYER':
    printMessage('You win!');
    break;
  case 'DEALER':
    printMessage('Dealer wins!');
    break;
  case 'TIE':
    printMessage("It's a tie!");
  }
}
//test: 
// displayResults(playerHand, dealerHand);

//to pop two cards from FULL_DECK_CARDS
function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}
//test:
//console.log(popTwoFromDeck(FULL_DECK_CARDS))
//popTwoFromDeck(FULL_DECK_CARDS);

// let cards = (popTwoFromDeck(shuffledCards));

function hand(cards) {
  return cards.map(card => `${card[1]}${card[0]}`).join(" ");
}
// //test:
// console.log(hand(cards));


//GENERIC FUNCTIONS:

// determines & validates whether player wants to play another game
function playAgain(anotherGame) {
  const validYesOrNo = ['yes', 'no'];

  printMessage(
    `Do you want to play again? Choose ${validYesOrNo.join(' or ')}.`,
  );
  anotherGame = readline.question().toLowerCase();

  while (
    !validYesOrNo.includes(anotherGame) &&
    anotherGame !== 'n' &&
    anotherGame !== 'y'
  ) {
    printMessage("Please choose: 'yes' or 'no'.");
    anotherGame = readline.question().toLocaleLowerCase();
  }
  return anotherGame;
}


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