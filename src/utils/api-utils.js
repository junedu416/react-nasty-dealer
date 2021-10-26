//INPUT numDecks: Integer - number of decks to generate
//OUTPUT data.deck_id: Promise(String) - deck_id to reference the decks generated
async function initialiseDeck(numDecks) {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numDecks}`
  );
  const data = await response.json();
  return data.deck_id;
}

/*INPUT deckId: String - reference to the deck for the API
 *      numCards: Integer - num cards to draw
 *OUTPUT data.cards: Promise(Array) - Array of card objects received from the API
 */
async function drawCard(deckId, numCards) {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`
  );
  const data = await response.json();
  console.log(data.remaining)
  if (data.remaining < 30) {
    shuffleDeck(deckId);
  }
  return data.cards;
}

// use API to censor swear words. API Returns as json in format {result: "{censored string}"}
async function applyCensorship(string) {
    const response = await fetch(`https://www.purgomalum.com/service/json?text=${string}`)
    const data = await response.json();
    return data.result;
}

async function shuffleDeck(deckId) {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?deck_count=6`
  )
  const data = await response.json();
  return data.success;
}

export {
    initialiseDeck,
    drawCard,
    applyCensorship
}
