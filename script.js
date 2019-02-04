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

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = shuffledDeck[currentIndex];
    shuffledDeck[currentIndex] = shuffledDeck[randomIndex];
    shuffledDeck[randomIndex] = temporaryValue;

  }
  return shuffledDeck;
}

const player = {
  hand:[],
  score:0,
  handVal:0
}
const dealer = {
  hand:[],
  score:0,
  handVal:0
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

  const newDiv = document.createElement('div');
  newDiv.innerText = `A ${card.rank} of ${card.suit}`;
  newDiv.classList.add('card');
  const appendee = document.querySelector(`#${currentPlayer}`);
  appendee.appendChild(newDiv);
}

const checkInitialWin = () => {
  // not in mvp. win hand if you get blackjack, lose if dealer does.
}

const handInit = (deck) => {
  player.hand = [];
  dealer.hand = [];
  dealCard('player-hand', deck);
  dealCard('player-hand', deck);
  dealCard('dealer-hand', deck);
  dealCard('dealer-hand', deck);
}
const handleHitClick = (deck) => {
  dealCard('player-hand', deck);
}

const handleHoldClick = () => {

}

const playerTurn = (deck) => {
  document.querySelector('#hit').addEventListener('click', () => handleHitClick(deck));
  document.querySelector('#hold').addEventListener('click', handleHoldClick);
  // event listeners buttons
  // hold = return true out of func ---to ternary?
  // hit = dealcard(playerhand)
  //     - check if bust
  //     -if bust, return false

  //end of turn, remove event listeners
}
const dealerTurn = (deck) => {
  // if score under 17 keep hitting
  // check bust after each hit
}

const startGame = () => {
  const deck = shuffle(buildDeck());
  handInit(deck);
  playerTurn(deck);
  //ternary handleplayerTurn  T=goto dealer turn F=next hand
 //  wrap turn funcs in while loop? while total score less than 5 will loop throughturns
  // did win?
  //yes- continues
  //no - deal again
  // showEndGameScreen
}
startGame();


// create player and dealer objects w score, handval, hand. change funcs
