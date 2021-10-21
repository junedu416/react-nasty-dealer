import { useEffect, useState } from "react";
import { initialiseDeck, drawCard } from "../utils/api-utils";
import Card from "../classes/Card";
import Hand from "./Hand";

const CardTest = () => {
  const [deckId, setDeckId] = useState("");
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [dealersTurn, setDealersTurn] = useState(false);

  //initialise a new 6 decks and set the id in state
  useEffect(() => {
    initialiseDeck(6).then(setDeckId);
  }, []);

  //INPUT: cards: Array of Objects receieved from API
  //       dealer: Boolean - true if adding to dealers hand
  function addToHand(cards, dealer) {
    let cardsToAdd = [];
    //create a new Card from data receieved and push to array of Cards to add to state
    cards.forEach((card) => {
      cardsToAdd.push(new Card(card.suit, card.value, card.image));
    });

    //add new cards to players cards paying respect to what cards they already have
    if (dealer) {
      setDealerCards([...dealerCards, ...cardsToAdd]);
    } else {
      setPlayerCards([...playerCards, ...cardsToAdd]);
    }
  }

  //draw 2 cards for player then for dealer
  function dealCards() {
    drawCard(deckId, 2).then((cards) => addToHand(cards, false));
    drawCard(deckId, 2).then((cards) => addToHand(cards, true));
  }

  return (
    <>
      <h1>card api test</h1>
      <h2>deckId: {deckId}</h2>
      {/*buttons call drawCard to make API request and then pass data to addToHand*/}
      <button onClick={() => drawCard(deckId, 2).then(addToHand)}>
        Draw 2 Cards
      </button>
      <button onClick={() => drawCard(deckId, 1).then(addToHand)}>
        Draw 1 Card
      </button>
      <button onClick={dealCards}>Deal</button>
      <Hand dealer dealersTurn={dealersTurn} cards={dealerCards}/>
      <Hand cards={playerCards}/>
    </>
  );
};

export default CardTest;
