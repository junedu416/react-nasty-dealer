import { useEffect, useState } from "react";
import { initialiseDeck, drawCard } from "../utils/api-utils";
import Card from "../classes/Card";
import Hand from "./Hand";
import Bet from "./buttons/Bet";
import Deal from "./buttons/Deal";
import Double from "./buttons/Double";
import Hit from "./buttons/Hit";
import Split from "./buttons/Split";
import Stand from "./buttons/Stand";
import Button from "@mui/material/Button";
import ChatBox from "./ChatBox";

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
      <p>deckId: {deckId}</p>
      {/*buttons call drawCard to make API request and then pass data to addToHand*/}
      {/* <button onClick={() => drawCard(deckId, 2).then(addToHand)}>
        Draw 2 Cards
      </button>
      <button onClick={() => drawCard(deckId, 1).then(addToHand)}>
        Draw 1 Card
      </button>
      <button onClick={dealCards}>Deal</button> */}
      <Hand dealer dealersTurn={dealersTurn} cards={dealerCards} />
      <Hand cards={playerCards} />

      <div>
        <Bet />
        <Split />
        <Stand />
        <Hit buttonFunc={() => drawCard(deckId, 1).then(addToHand)}/>
        <Double />
        <Deal buttonFunc={dealCards} />
      </div>
      <ChatBox />
    </>
  );
};

export default CardTest;
