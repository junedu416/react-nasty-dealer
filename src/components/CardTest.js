import { useEffect, useState, useReducer } from "react";
import { initialiseDeck, drawCard } from "../utils/api-utils";
import Card from "../classes/Card";
import Hand from "./Hand";
import Bet from "./buttons/Bet";
import Deal from "./buttons/Deal";
import Double from "./buttons/Double";
import Hit from "./buttons/Hit";
import Split from "./buttons/Split";
import Stand from "./buttons/Stand";
import ChatBox from "./ChatBox";


const CardTest = () => {
  //initState for dealer and player
  const initialHand = {
    cards: [],
    score: {
      highTotal: 0,
      lowTotal: 0
    },
    bust: false,
    stand: false,
    // clare: add winCount 
    // winCount: 0
  }
  const [deckId, setDeckId] = useState("");

  //State for dealer vars
  const [dealerVars, dealerDispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "addCard": {
        const newScore = updateScore(action.payload.value, state.score);
        return ({
          ...state,
          cards: [...state.cards, action.payload],
          score: state.cards.length === 1 && !state.turn ? state.score : newScore,
          bust: newScore.lowTotal > 21 ? true : false,
          stand: (newScore.highTotal >= 17 && newScore.lowTotal >= 17)|| newScore.lowTotal >= 17 ? true : false
        })
      }
      case "setTurn": {
        const faceDownValue = updateScore(state.cards[state.cards.length-1].value, state.score);
        return ({
          ...state,
          turn: true,
          score: faceDownValue,
          stand: faceDownValue.highTotal >= 17 || faceDownValue.lowTotal >= 17 ? true : false
        })
      }
      // // clare: add winCount 
      // case "addWinCount": {
      //   return({
      //     ...state,
      //     winCount: state.winCount + 1
      //   })
      // }
      default: {
        throw new Error("Invalid action for Dealer");
      }
    }
  },{...initialHand})

  //state for playerVars
  const [playerVars, playerDispatch] = useReducer((state, action) => {
    switch(action.type) {
      case "addCard": {
        const newScore = updateScore(action.payload.value, state.score);
        return ({
          ...state,
          cards: [...state.cards, action.payload],
          score: newScore,
          bust: newScore.lowTotal > 21 ? true : false
        })
      }
      case "stand": {
        return ({...state, stand: true})
      }
      // // clare: add winCount 
      // case "addWinCount": {
      //   return({
      //     ...state,
      //     winCount: state.winCount + 1
      //   })
      // }
      default: {
        throw new Error("Invalid action for Player");
      }
    }
  }, {...initialHand})

  //initialise a new 6 decks and set the id in state
  useEffect(() => {
    initialiseDeck(6).then(setDeckId);
  }, []);

  useEffect(() => {
    if (!dealerVars.stand && dealerVars.turn) {
      drawCard(deckId, 1).then(addCardToDealer);
    }
  }, [dealerVars.score, dealerVars.turn, dealerVars.stand, deckId])

  function updateScore(value, curScore) {
    let newScore = {...curScore}
    if (value === "ACE") {
      newScore.lowTotal += 1;
      newScore.highTotal += newScore.highTotal + 11 > 21 ? 1 : 11;
    } else if (isNaN(value) === true) {
      // face cards
      newScore.lowTotal += 10;
      newScore.highTotal += 10;
    } else {
      // number cards
      value = parseInt(value);
      newScore.lowTotal += value;
      newScore.highTotal += value;
    }
    return newScore;
}

  //draw 2 cards for player then for dealer
  function dealCards() {
    drawCard(deckId, 1).then(addCardToPlayer);
    drawCard(deckId, 1).then(addCardToDealer);
    drawCard(deckId, 1).then(addCardToPlayer);
    drawCard(deckId, 1).then(addCardToDealer);
  }

  //===================
  //wrappers to interact with dispatches
  function addCardToDealer(card) {
    const newCard = new Card(card[0].suit, card[0].value, card[0].image);
    dealerDispatch({
      type: "addCard",
      payload: newCard
    });
  }

  function addCardToPlayer(card) {
    const newCard = new Card(card[0].suit, card[0].value, card[0].image);
    playerDispatch({
      type: "addCard",
      payload: newCard
    });
  }
  //================

  return (
    <>
      <p>deckId: {deckId}</p>

      <div>
        <Bet />
        <Split />
        <Stand buttonFunc={() => {
          playerDispatch({type: "stand"});
          dealerDispatch({type: "setTurn"});
          }}/>
        <Hit buttonFunc={() => drawCard(deckId, 1).then(addCardToPlayer)}/>
        <Double />
        <Deal buttonFunc={dealCards} />
      </div>
      
      <Hand dealer dealersTurn={dealerVars.turn} cards={dealerVars.cards} score={dealerVars.score} bust={dealerVars.bust}/>
      <Hand cards={playerVars.cards} score={playerVars.score} bust={playerVars.bust}/>

      <ChatBox dealerWin={playerVars.bust}/>
    </>
  );
};

export default CardTest;
