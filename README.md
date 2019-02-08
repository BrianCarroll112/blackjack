# Blackjack
[Game Hosted on Surge] (http://bc-blackjack.surge.sh/)
## Rules

The goal of the game is to get your bankroll (starts at $350) to $1,000. This is done via placing a bet of your chosen money amount on a round. One round (hand) is won by getting closer to a total card value to 21. If you break 21, you lose the hand. The dealer, after your hand if you don't bust, will draw until they have at least 17. If the dealer busts, you win the hand.

## Wireframes

## Code Snippet

```
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
};
```

## Issues and Resolutions

1. Card Animation from Offscreen

  Had some difficulty getting cards to appear offscreen and sliding onscreen. Cards were appearing, then disappearing, then sliding onto the screen, then disappearing again. By adding in an initial hidden visibility and only allowing the animation to move forward with animation fill mode I rectified these problems.

2. Flipping the dealer card

  By wrapping the card image and the back of card image in two layers of divs (with some help from W3 Schools) and finding the CSS feature of backface-visibility I was able to make the dealer card face down to begin and cleanly flip over later.
