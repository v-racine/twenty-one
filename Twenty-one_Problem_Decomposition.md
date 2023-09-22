_High-level Sequence of Gameplay_

1. Initialize deck
2. Deal cards to player and dealer
3. Player turn: hit or stay
   - repeat until bust or stay
4. If player bust, dealer wins.
5. Dealer turn: hit or stay
   - repeat until total >= 17
6. If dealer busts, player wins.
7. Compare cards and declare winner.

_Data Structure_

What data structure should you use to contain the deck, the player's cards, and the dealer's cards?
-nested array:

```js
[
  ["H", "2"],
  ["S", "J"],
  ["D", "A"],
]; //2 of hearts, jack of spades, ace of diamonds
```

Card Values:

1. cards 2 -10 have face value
2. Jack, Queen, and King have a value of 10
3. an Ace can have a value of 1 or 11

```js
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
```

_Calculating Aces_

You shouldn't ask the player what the value of each Ace is; your program should be able to figure that out automatically.

```js
function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map((card) => card[1]);

  let sum = 0;
  values.forEach((value) => {
    if (value === "A") {
      sum += 11;
    } else if (["J", "Q", "K"].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values
    .filter((value) => value === "A")
    .forEach((_) => {
      if (sum > 21) sum -= 10;
    });

  return sum;
}
```

_Player's Turn_

We'll need a loop that keeps asking the player to either hit ot stay. We'll also need the breaking conditions for that loop.
Here's some pseudocode:

- Ask player to hit or stay
- If stay, stop asking
- if bust, stop asking
- Otherwise, go to #1

```js
while (true) {
  console.log("hit or stay?");
  let answer = readline.question();
  if (answer === "stay" || busted()) break;
}
```

Thus, the player can only exit the loop when they stay or when they bust.

- need a `busted` function

When the loop ends, we can recheck the conditions to see why the loop ended, and if needed, we can handle things differently.

```js
if (busted()) {
  //prob end the game? or ask if player wants to play again?
} else {
  console.log("You chose to stay!");
}
```

_Shuffle Cards_

You'll need to shuffle the deck of cards to make sure that they're in a random order before you start dealing cards.
So, you'll need to implement a shuffling function.

```js
function shuffle(array) {
  for (let ind = array.length - 1; ind > 0; ind--) {
    let otherInd = Math.floor(Math.random() * (ind + 1));
    [array[ind], array[otherInd]] = [array[otherInd], array[ind]]; //swaps elements
  }
  return array;
}
```

_Dealer's Turn_

The dealer turn follows a pattern that's very similar to the player's turn. However, the break condition occurs at the top of the "hit or stay" loop.

```js
while (true) {
  if (busted()) break;
  console.log("stay!");
}
```

_Display Results_

When you display the result, you also need to perform the calculation of who won. Having one function that both performs the calculation and displays the result is hard to reason about. So, you'll need two functions:

- `determineResult`
- `displayResult`
