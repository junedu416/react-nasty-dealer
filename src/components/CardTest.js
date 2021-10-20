import { useEffect, useState } from "react";
import { initialiseDeck, drawCard } from "../utils/api-utils";
import Card from "../classes/Card";

const CardTest = () => {
  const [deckId, setDeckId] = useState("");
  const [playerCards, setPlayerCards] = useState([]);
  const [score, setScore] = useState({
    softTotal: 0,
    hardTotal: 0,
  });

  //initialise a new 6 decks and set the id in state
  useEffect(() => {
    initialiseDeck(6).then(setDeckId);
  }, []);

  //INPUT: cards: Array of Objects receieved from API
  function addToHand(cards) {
    let cardsToAdd = [];
    //create a new Card from data receieved and push to array of Cards to add to state
    cards.forEach((card) => {
      cardsToAdd.push(new Card(card.suit, card.value, card.image));
      calculateScore(card.value);
    });

    //add new cards to players cards paying respect to what cards they already have
    setPlayerCards([...playerCards, ...cardsToAdd]);
  }

  function calculateScore(value) {
    // calculates score for aces
    if (value === "ACE") {
      score.hardTotal += 1;
      score.softTotal += score.softTotal + 11 > 21 ? 1 : 11;
    } else if (isNaN(value) === true) {
      // face cards
      score.hardTotal += 10;
      score.softTotal += 10;
    } else {
      // number cards
      value = parseInt(value);
      score.hardTotal += value;
      score.softTotal += value;
    }
    setScore({ ...score });
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
      {/*Display cards value/suit/img*/}
      <h2>Players Cards:</h2>
      {playerCards.map((card, index) => {
        return (
          <div key={index}>
            <p>
              {card.value} {card.suit}
            </p>
            <img alt={`${card.value} ${card.suit}`} src={card.imgString} />
          </div>
        );
      })}
    </>
  );
};

export default CardTest;
