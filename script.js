console.log('linked');

/*
create deck of card objects and shuffle -- see high/low
   cards will need img, value,

give dealer 2 cards, one face down.
  dealer object, player object

give player 2 cards face up

player turn -
  option to hit/hold
    hold - pass turn to dealer
    hit - add one card to player's div - then hit/hold again
  check if over 21 after every hit. if so, lose.

dealer turn -
  continues to hit until cards add up to 17 or more.
  same over 21 check.

post dealer turn -
  flip dealer card
  compare scores, decide who won hand.
  add to "hands won" for dealer/player
  see if hands won meets win/loss condition
  start from line 7 OR display win/loss

--
player/dealer object - cards(array), turn value, hands won
deck - array of card objects
card objects - img , value ,
*/
const buildDeck = () => {
  const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  for (i = 0; i < 3; i++){
    for (rankIterator = 0; rankIterator < ranks.length; rankIterator++){
      for (suitIterator = 0; suitIterator < suits.length; suitIterator++){
        deck.push({suit: suits[suitIterator], rank: ranks[rankIterator], value: rankIterator });
      }
    }
  }
  return deck;
}

const shuffle = (deck) => {
  const shuffledDeck = deck;
  let currentIndex = shuffledDeck.length;
  let temporaryValue;
  let randomIndex;

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = shuffledDeck[currentIndex];
    shuffledDeck[currentIndex] = shuffledDeck[randomIndex];
    shuffledDeck[randomIndex] = temporaryValue;

  }
  return shuffledDeck;
}

const playerHand = [];
const dealerHand = [];

const dealCard = (currentPlayer, deck) => {
  const card = deck.pop();
  switch (currentPlayer) {
    case 'player-hand':
      playerHand.push(card);
      break;
    case 'dealer-hand':
      dealerHand.push(card);
      break;
  }

  const newDiv = document.createElement('div');
  newDiv.innerText = `A ${card.rank} of ${card.suit}`;
  newDiv.classList.add('card');
  const appendee = document.querySelector(`#${currentPlayer}`);
  console.log(appendee);
  appendee.appendChild(newDiv);
  }


const startGame = () => {
  const deck = shuffle(buildDeck());
  console.log(deck);
  dealCard('player-hand', deck);
  dealCard('player-hand', deck);
  dealCard('dealer-hand', deck);
  dealCard('dealer-hand', deck);

  // 2 cards to player
  // 2 to dealer - one facedown
  // handleplayerturn
  // handledealerturn
  // did win?
  //yes- continues
  //no - deal again
  // showEndGameScreen
}
startGame();
