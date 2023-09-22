const readline = require('readline-sync');

const FULL_DECK_CARDS = [
  ["H", "2"],
  ["H", "3"],
  ["H", "4"],
  ["H", "5"],
  ["H", "6"],
  ["H", "7"],
  ["H", "8"],
  ["H", "9"],
  ["H", "10"],
  ["H", "J"],
  ["H", "Q"],
  ["H", "K"],
  ["H", "A"],
  ["S", "2"],
  ["S", "3"],
  ["S", "4"],
  ["S", "5"],
  ["S", "6"],
  ["S", "7"],
  ["S", "8"],
  ["S", "9"],
  ["S", "10"],
  ["S", "J"],
  ["S", "Q"],
  ["S", "K"],
  ["S", "A"],
  ["D", "2"],
  ["D", "3"],
  ["D", "4"],
  ["D", "5"],
  ["D", "6"],
  ["D", "7"],
  ["D", "8"],
  ["D", "9"],
  ["D", "10"],
  ["D", "J"],
  ["D", "Q"],
  ["D", "K"],
  ["D", "A"],
  ["C", "2"],
  ["C", "3"],
  ["C", "4"],
  ["C", "5"],
  ["C", "6"],
  ["C", "7"],
  ["C", "8"],
  ["C", "9"],
  ["C", "10"],
  ["C", "J"],
  ["C", "Q"],
  ["C", "K"],
  ["C", "A"],
];

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