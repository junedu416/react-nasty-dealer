function getRandomInteger(max) {
  return Math.floor(Math.random() * max + 1);
}

const playerWinResponse = [
  "Fine, I guess you win",
  "You just got lucky. I'm still better than you",
  "How dare you win against me",
  "You're not worthy of winning",
];

const playerBustResponse = [
  "Haha you Busted",
  "You went Bust, as you should",
  "You dumb child. That's why you go Bust",
];

const playerLoseResponse = [
    "Loser. You don't stand a chance against me", 
    "You lost. I'd love to see you go broke",
    "Get on your knees, peasant. I am the winner",
    "HA I WIN",
    "And the winner is...ME😈"
];

const runningOutTimeResponse = [
  "Can you be quick, you litte b******!",
  "I swear by God, hurry up.. !!",
  "Hurry up!!!",
  "Hurry up! You are wasting my time!",
  "What are you waiting for, you're gonna loose anyway!"
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
  runningOutTimeResponse,
  playerLoseResponse,
  decodeHtmlEntity,
};
