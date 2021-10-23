function getRandomInteger(max) {
  return Math.floor(Math.random() * max + 1);
}

const playerWinResponse = [
  "Fine, I guess you win",
  "It's just one win. I'm still better than you",
  "How dare you win against me",
  "You're not worthy of winning",
];

const playerBustResponse = [
  "Haha you Busted",
  "You went Bust, as you should",
  "You went Bust because you're dumb",
];

const playerLoseResponse = [
    "Loser. You don't stand a chance against me", 
    "You lost. I'd love to see you go broke",
    "HA I WIN",
    "And the winner is...ME😈"
];

function decodeHtmlEntity(str) {
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/&gt;/g, ">");
  return str;
}

export {
  getRandomInteger,
  playerWinResponse,
  playerBustResponse,
  playerLoseResponse,
  decodeHtmlEntity,
};
