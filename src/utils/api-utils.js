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
  return data.cards;
}

export { initialiseDeck, drawCard };
