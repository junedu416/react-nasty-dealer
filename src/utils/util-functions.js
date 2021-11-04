function getRandomInteger(max) {
  return Math.floor(Math.random() * max + 1);
}

const playerWinResponse = [
  "Fine, I guess you win",
  "You just got lucky. I'm still better than you",
  "How dare you win against me",
  "You're not worthy of winning",
  "Your luck's gonna run out eventually",
  "Remember the feeling, coz you're gonna be miserable when I take all your chips",
];

const playerBustResponse = [
  "Haha! You Busted",
  "You went Bust, as you should",
  "You dumb child. That's why you go Bust",
  "Now that was wishful thinking",
  "Might as well just give me all your money right now",
  "A dumb monkey like you just doesn't know when to stop"
];

const playerLoseResponse = [
  "Loser. You don't stand a chance against me",
  "You lost. I'd love to see you go broke",
  "Get on your knees, peasant. I am the winner",
  "HA! I WIN",
  "And the winner is...ME 😈",
  "House always wins",
  "Like you even stood a chance",
  "PATHETIC!",
  "I'd happily take your chips all day, every day",
  "If you haven't noticed, I run the show around here",
  "You couldn't beat me even on your best day",
  "Lady luck just isn't on your side today, is she",
  "Boy, you sure suck at this",
  "If I got a $100 commission for every time you lose, I'd already be a billionaire",
  "You my friend, belong at the loser's table",
  "My day just got a whole lot better now that you're here, now give me your chips",
  "Your chances of winning: zilch!",
  "Come back after you ask a kid to teach you how to count"
];

const runningOutTimeResponse = [
  "Can you be quick, you litte b*****d!",
  "I swear, by God, hurry up already!",
  "Hurry up!!!",
  "Hurry up! You're wasting my time!",
  "What are you waiting for, you're gonna lose anyway!",
  "Do you even need to think, there's nothing up there",
  "I ain't got all day..",
  "Time is ticking",
  "The clock is ticking",
  "Even a statue can run faster than you, that's saying something..",
  "Goddamn, just make your move already!",
  "I'll be down the bare bones by the time you're done.",
  "100 years later...",
  "C'mon! Snap, snap!",
];

function decodeHtmlEntity(str) {
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/&gt;/g, ">");
  return str;
}

function tallySplitResults(bust, result) {
  let results = {
    win: 0,
    lose: 0,
    push: 0,
    blackJack: 0,
  };
  bust.forEach((hand) => {
    if (hand) results.lose += 1;
  });
  result.forEach((hand) => {
    if (hand.win) {
      if (hand.condition === "blackjack") {
        results.blackJack += 1;
      } else {
        results.win += 1;
      }
    } else if (hand.condition === "push") {
      results.push += 1;
    } else if (hand.condition === "lose_to_dealer") {
      results.lose += 1;
    }
  });
  return results;
}

export {
  getRandomInteger,
  playerWinResponse,
  playerBustResponse,
  runningOutTimeResponse,
  playerLoseResponse,
  decodeHtmlEntity,
  tallySplitResults,
};
