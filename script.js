const buildDeck = () => {
  // 3 full decks in order, then give value to each card
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
    ele.image = giveBackground(ele);
    ele.backImage = `url('images/cards.jpg') -158px -492px`;
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
  bankroll: 350,
  currentBet: 0,
  handVal: 0
}
const dealer = {
  hand: [],
  handVal: 0
}

const handleAce = (currentPlayer) => {
  //contextually handle aces, ace will be an 11 unless it will make you lose.
  switch (currentPlayer) {
    case 'player-hand':
      if (player.handVal > 21) {
        player.hand.forEach(ele => {
          if (ele.rank === 'A' && ele.value === 11) {
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
  //add card to hand, add value to handVal, then render card div
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
  if (currentPlayer === 'dealer-hand' && dealer.hand.length === 1){
    newDiv.style.background = card.backImage;
  } else {
  newDiv.style.background = card.image;
  }
  newDiv.classList.add('card');
  const appendee = document.querySelector(`#${currentPlayer}`);
  appendee.appendChild(newDiv);
}

const giveBackground = (card) => {
  //interpolate and return string to set to background: of card divs
  let returnVal = `url('images/cards.jpg') `;
  let posVal = parseInt(card.rank) - 1;

  switch (card.rank) {
    case 'A':
      returnVal += '0px ';
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
      returnVal += '-' + (posVal * 79) + 'px ';
      break;
    case 'J':
      returnVal += '-790px ';
      break;
    case 'Q':
      returnVal += '-869px ';
      break;
    case 'K':
      returnVal += '-948px ';
      break;
  }

  switch (card.suit) {
    case 'clubs':
      returnVal += '0px';
      break;
    case 'diamonds':
      returnVal += '-123px';
      break;
    case 'hearts':
      returnVal += '-246px';
      break;
    case 'spades':
      returnVal += '-369px';
      break;
  }


  return returnVal;
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
    player.bankroll -= player.currentBet;
    dealerShows();
    renderToLastHand('Player Bust. Hand Lost.')
    renderToGameStats();
    checkWin();
  }
}

const buttonHandlers = (deck) => {
  document.querySelector('#hit').addEventListener('click', () => {
    if (player.hand.length > 0) {
      handleHitClick(deck)
    }
  });
  document.querySelector('#hold').addEventListener('click', () => {
    if (player.hand.length > 0) {
      dealerTurn(deck)
    }
  });
  document.querySelector('#bet').addEventListener('click', () => {
    if (player.hand.length === 0){
      if (document.querySelector('input').value <= player.bankroll) {
        player.currentBet = parseInt(document.querySelector('input').value);
        handInit(deck);
      } else {
        alert(`You don't have that much! Try a new bet.`)
      }
    }
  });
  document.querySelector('#reset').addEventListener('click', resetGame);
}

const dealerTurn = (deck) => {
  dealerShows();
  while (dealer.handVal < 17) {
    dealCard('dealer-hand', deck);
  }
  if (dealer.handVal > 21) {
    player.bankroll += player.currentBet;
    renderToLastHand('Dealer Bust, Hand Win!');
    renderToGameStats();
  } else {
    if (player.handVal === dealer.handVal) {
      renderToLastHand('Push. You tied.');
    } else if (player.handVal > dealer.handVal) {
      player.bankroll += player.currentBet;
      renderToLastHand('Hand Won!');
      renderToGameStats();
    } else if (player.handVal < dealer.handVal) {
      player.bankroll -= player.currentBet;
      renderToLastHand('Hand Lost.')
      renderToGameStats();
    }
  }
  checkWin();
}

const checkWin = () => {
  if (player.bankroll >= 1000) {
    //win
    //showwinscreen .. overlay with some info and restart button
    console.log('You WIN!!!');
  } else if (player.bankroll <= 0) {
    // lose
    //showLoseScreen
    console.log('You LOSE!!!!');
  }
}

const renderToLastHand = (result) => {
  //take current hand info and render to last hand aside.
  //uses a given string for rendering the result portion
  //calls handReset on a timeout

  const playerPrev = document.querySelector('#player-prev-score');
  const dealerPrev = document.querySelector('#dealer-prev-score');
  const resultPrev = document.querySelector('#prev-result');
  const betPrev = document.querySelector('#player-prev-bet');

  playerPrev.innerText = player.handVal;
  dealerPrev.innerText = dealer.handVal;
  resultPrev.innerText = result;
  betPrev.innerText = '$' + player.currentBet;

  setTimeout(handReset, 2000);
}
const dealerShows = () => {
  document.querySelector('#dealer-hand').firstChild.style.background = dealer.hand[0].image;
}

const renderToGameStats = () => {
  document.querySelector('#current-bankroll').innerHTML = '$' +player.bankroll;
}

const resetGame = () => {
  window.location.reload(false);
}

const startGame = () => {
  const deck = shuffle(buildDeck());
  buttonHandlers(deck);
}

startGame();

// win lose start screens

// make buttons poker chips? border shadows for 3d-ish style?
//style hit/hold button area.
//animations - cards come from left, x axis 360 flip w keyframes. fft sound?
