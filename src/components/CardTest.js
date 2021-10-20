import { useEffect, useState } from "react";
import { initialiseDeck, drawCard } from "../utils/api-utils";
import Card from "../classes/Card";

const CardTest = () => {
    const [deckId, setDeckId] = useState("");
    const [playerCards, setPlayerCards] = useState([]);

    //initialise a new 6 decks and set the id in state
    useEffect(() => {
        initialiseDeck(6).then(setDeckId);
    }, [])

    //INPUT: cards: Array of Objects receieved from API
    function addToHand(cards) {
        let cardsToAdd = [];
        //create a new Card from data receieved and push to array of Cards to add to state
        cards.forEach(card => {
            cardsToAdd.push(new Card(card.suit, card.value, card.image));
        });
        //add new cards to players cards paying respect to what cards they already have
        setPlayerCards([...playerCards, ...cardsToAdd]);
    }

    return (
        <>
        <h1>card api test</h1>
        <h2>deckId: {deckId}</h2>
        {/*buttons call drawCard to make API request and then pass data to addToHand*/}
        <button onClick={() => drawCard(deckId, 2).then(addToHand)}>Draw 2 Cards</button>
        <button onClick={() => drawCard(deckId, 1).then(addToHand)}>Draw 1 Card</button>
        {/*Display cards value/suit/img*/}
        <h2>Players Cards:</h2>
        {playerCards.map((card, index) => {
            return (
                <div key={index}>
                    <p>{card.value} {card.suit}</p>
                    <img alt={`${card.value} ${card.suit}`}src={card.imgString} />
                </div>
            )
        })}
        </>
    )
}

export default CardTest;