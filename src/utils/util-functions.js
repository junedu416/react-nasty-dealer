function getRandomInteger(max) {
  return Math.floor(Math.random() * max + 1);
}

const playerWinResponse = [
  "Fine, I guess you win",
  "I'm still better than you",
  "How dare you win against me",
  "You're not worthy of winning",
];

const playerBustResponse = [
  "Haha you Busted",
  "You went Bust, as you should",
  "You went Bust because you're dumb",
];
// const playerLoseResponse = ["You don't stand a chance against me", "I'd love to see you go broke"]

function decodeHtmlEntity(str) {
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/&gt;/g, ">");
  return str;
}

export {
  getRandomInteger,
  playerWinResponse,
  playerBustResponse,
  decodeHtmlEntity,
};
