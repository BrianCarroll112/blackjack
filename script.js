const buildDeck = () => {
  const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  for (i = 0; i < 3; i++) {
    for (rankIterator = 0; rankIterator < ranks.length; rankIterator++) {
      for (suitIterator = 0; suitIterator < suits.length; suitIterator++) {
        deck.push({
          suit: suits[suitIterator],
          rank: ranks[rankIterator],
          value: rankIterator
        });
      }
    }
  }
  deck.forEach(ele => {
    switch (ele.rank) {
      case 'A':
        ele.value = 11;
        break;
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
        ele.value = parseInt(ele.rank);
        break;
      case 'J':
      case 'Q':
      case 'K':
        ele.value = 10;
        break;

    }
  });
  return deck;
}

const shuffle = (deck) => {
  const shuffledDeck = deck;
  let currentIndex = shuffledDeck.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = shuffledDeck[currentIndex];
    shuffledDeck[currentIndex] = shuffledDeck[randomIndex];
    shuffledDeck[randomIndex] = temporaryValue;

  }
  return shuffledDeck;
}

const player = {
  hand: [],
  score: 0,
  handVal: 0
}
const dealer = {
  hand: [],
  score: 0,
  handVal: 0
}
const handleAce = (currentPlayer) => {
  switch (currentPlayer) {
    case 'player-hand':
      if (player.handVal > 21) {
        player.hand.forEach(ele => {
          if (ele.rank === 'A') {
            ele.value = 1;
            player.handVal -= 10;
          }
        });
      }
      break;
    case 'dealer-hand':
      if (dealer.handVal > 21) {
        dealer.hand.forEach(ele => {
          if (ele.rank === 'A') {
            ele.value = 1;
            dealer.handVal -= 10;
          }
        });
      }
      break;
  }
}

const dealCard = (currentPlayer, deck) => {
  const card = deck.pop();
  switch (currentPlayer) {
    case 'player-hand':
      player.hand.push(card);
      player.handVal += card.value;
      break;
    case 'dealer-hand':
      dealer.hand.push(card);
      dealer.handVal += card.value;
      break;
  }
  handleAce(currentPlayer);

  const newDiv = document.createElement('div');
  newDiv.innerText = `A ${card.rank} of ${card.suit}`;
  newDiv.classList.add('card');
  const appendee = document.querySelector(`#${currentPlayer}`);
  appendee.appendChild(newDiv);
}

const handReset = () => {
  player.hand = [];
  dealer.hand = [];
  player.handVal = 0;
  dealer.handVal = 0;
  document.querySelector('#player-hand').innerHTML = '';
  document.querySelector('#dealer-hand').innerHTML = '';
}
const handInit = (deck) => {
  handReset();
  dealCard('player-hand', deck);
  dealCard('player-hand', deck);
  dealCard('dealer-hand', deck);
  dealCard('dealer-hand', deck);

}

const handleHitClick = (deck) => {
  dealCard('player-hand', deck);
  if (player.handVal > 21) {
    dealer.score += 1;
    console.log('PLAYER BUST.')
    handInit(deck);
  }
}

const buttonHandlers = (deck) => {
  document.querySelector('#hit').addEventListener('click', () => handleHitClick(deck));
  document.querySelector('#hold').addEventListener('click', () => dealerTurn(deck));
}

const dealerTurn = (deck) => {
  while (dealer.handVal < 17) {
    dealCard('dealer-hand', deck);
  }
  if (dealer.handVal > 21) {
    player.score += 1;
    console.log('Dealer bust, hand win.')
  } else {
    if (player.handVal === dealer.handVal) {
      console.log('PUSH');
    } else if (player.handVal > dealer.handVal) {
      player.score += 1;
      console.log('Hand Won!');
    } else if (player.handVal < dealer.handVal) {
      dealer.score += 1;
      console.log('Hand Lost..');
    }
  }
  handInit(deck);
}

const startGame = () => {
  const deck = shuffle(buildDeck());
  handInit(deck);
  buttonHandlers(deck);
}

startGame();


// handle Ace context
// everything disappears too quick. log last hand? use toggle area for that?
// final win/loss condition + reset game
// money
