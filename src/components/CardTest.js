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


import { GameContainer, ChatContainer, CenteredBox, PageContainer } from "./styled-components";

import Chips from "./Chips";
import useSound from "use-sound";
import soundHit from "./sounds/card-flick.wav";
import soundDouble from "./sounds/bonus.wav";
import soundSplit from "./sounds/split.mp3";
import soundDeal from "./sounds/deal.wav";
import soundStand from "./sounds/stand.wav";
import soundBet from "./sounds/clinking-coins.wav";

const CardTest = () => {
  // useSound hook
  const [hitSound] = useSound(soundHit);
  const [doubleSound] = useSound(soundDouble);
  const [dealSound] = useSound(soundDeal);
  const [standSound] = useSound(soundStand);
  const [splitSound] = useSound(soundSplit);
  const [betSound] = useSound(soundBet);

  //initState for dealer and player
  const initialHand = {
    cards: [],
    score: {
      highTotal: 0,
      lowTotal: 0,
    },
    bust: false,
    stand: false,
    chips: 1000,
    betSize: 0,
    playerPaid: false,
    //clare: add win/lose status
    result: { win: false, condition: "" },
  };
  const [deckId, setDeckId] = useState("");

  const [bettingMode, setBettingMode] = useState(false);

  //State for dealer vars
  const [dealerVars, dealerDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "addCard": {
          const newScore = updateScore(action.payload.value, state.score);
          return {
            ...state,
            cards: [...state.cards, action.payload],
            score:
              state.cards.length === 1 && !state.turn ? state.score : newScore,
            bust: newScore.lowTotal > 21 ? true : false,
            stand:
              (newScore.highTotal >= 17 && newScore.lowTotal >= 17) ||
              newScore.lowTotal >= 17
                ? true
                : false,
          };
        }
        case "setTurn": {
          const faceDownValue = updateScore(
            state.cards[state.cards.length - 1].value,
            state.score
          );
          return {
            ...state,
            turn: true,
            score: faceDownValue,
            stand:
              state.stand ||
              faceDownValue.highTotal >= 17 ||
              faceDownValue.lowTotal >= 17
                ? true
                : false,
          };
        }
        case "stand": {
          return { ...state, stand: true };
        }
        case "reset": {
          return { ...initialHand };
        }
        default: {
          throw new Error("Invalid action for Dealer");
        }
      }
    },
    { ...initialHand }
  );

  // // clare: change win status
  // case "dealerWin": {
  //   return({
  //     ...state,
  //     win: true
  //   })
  // }

  //state for playerVars
  const [playerVars, playerDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "addCard": {
          const newScore = updateScore(action.payload.value, state.score);
          const bust = newScore.lowTotal > 21;
          let blackjack = false;
          if (newScore.highTotal === 21 && state.cards.length + 1 === 2) {
            blackjack = true;
            console.log("blackjack");
            dealerDispatch({ type: "stand" });
          }
          if (bust) dealerDispatch({ type: "stand" });
          return {
            ...state,
            cards: [...state.cards, action.payload],
            score: newScore,
            bust: bust,
            stand: state.stand || bust || blackjack,
          };
        }
        case "stand": {
          console.log("player stand");
          return {
            ...state,
            stand: true,
          };
        }
        case "reset": {
          console.log("resetting");
          return { ...initialHand, chips: state.chips };
        }
        case "addBet": {
          return {
            ...state,
            betSize:
              state.betSize + action.payload > state.chips
                ? state.betSize
                : state.betSize + action.payload,
          };
        }
        case "confirmBet": {
          return { ...state, chips: state.chips - state.betSize };
        }
        case "double": {
          return {
            ...state,
            stand: true,
            betSize: state.betSize * 2,
            chips: state.chips - state.betSize,
          };
        }
        case "addChips": {
          console.log("player wins", action.payload);
          return {
            ...state,
            chips: state.chips + action.payload,
            stand: true,
            playerPaid: true,
          };
        }
        case "changeResult": {
          return {
            ...state,
            result: { win: true, condition: action.payload },
          };
        }
        // // clare: change win status
        // case "playerWin": {
        //   return({
        //     ...state,
        //     win: true
        //   })
        // }
        default: {
          throw new Error("Invalid action for Player");
        }
      }
    },
    { ...initialHand }
  );

  //initialise a new 6 decks and set the id in state
  useEffect(() => {
    initialiseDeck(6).then(setDeckId);
  }, []);

  useEffect(() => {
    if (!dealerVars.stand && dealerVars.turn) {
      drawCard(deckId, 1).then(addCardToDealer);
    }
  }, [dealerVars.score, dealerVars.turn, dealerVars.stand, deckId]);

  useEffect(() => {
    if (playerVars.result.win && !playerVars.paid) {
      if (playerVars.result.condition === "blackjack") {
        playerDispatch({ type: "addChips", payload: playerVars.betSize * 2.5 });
      } else {
        playerDispatch({ type: "addChips", payload: playerVars.betSize * 2 });
      }
    }
  }, [
    playerVars.result,
    playerVars.score,
    playerVars.cards,
    playerVars.betSize,
    playerVars.paid,
  ]);

  useEffect(() => {
    function getPlayerFinalScore() {
      if (playerVars.score.highTotal === 21 || playerVars.score.lowTotal === 21)
        return 21;
      if (
        playerVars.score.highTotal < 21 &&
        playerVars.score.highTotal > playerVars.score.lowTotal
      )
        return playerVars.score.highTotal;
      return playerVars.score.lowTotal;
    }

    function getDealerFinalScore() {
      if (dealerVars.score.highTotal === 21 || dealerVars.score.lowTotal === 21)
        return 21;
      if (
        dealerVars.score.highTotal < 21 &&
        dealerVars.score.highTotal > dealerVars.score.lowTotal
      )
        return dealerVars.score.highTotal;
      return dealerVars.score.lowTotal;
    }

    if (dealerVars.stand && playerVars.stand) {
      const playerScore = getPlayerFinalScore();
      const dealerScore = getDealerFinalScore();
      if (playerScore === 21 && playerVars.cards.length === 2) {
        playerDispatch({ type: "changeResult", payload: "blackjack" });
      } else if (playerScore > dealerScore && playerScore <= 21) {
        playerDispatch({ type: "changeResult", payload: "beat_dealer" });
      } else if (playerScore <= 21 && dealerScore > 21) {
        playerDispatch({ type: "changeResult", payload: "dealer_bust" });
      }
    }
  }, [
    playerVars.stand,
    dealerVars.stand,
    playerVars.cards.length,
    dealerVars.score,
    playerVars.score,
  ]);

  function updateScore(value, curScore) {
    let newScore = { ...curScore };
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
    setTimeout(() => {
      dealSound();
    }, 1200);

    if (
      dealerVars.cards.length === 0 &&
      playerVars.cards.length === 0 &&
      playerVars.betSize > 0
    ) {
      playerDispatch({ type: "confirmBet" });
      drawCard(deckId, 1).then(addCardToPlayer);
      drawCard(deckId, 1).then(addCardToDealer);
      drawCard(deckId, 1).then(addCardToPlayer);
      drawCard(deckId, 1).then(addCardToDealer);
    } else if (playerVars.stand || playerVars.bust) {
      console.log("no dealio");
      resetPlayers();
    } else if (playerVars.betSize === 0) {
      console.log("no chips, no play, no game today");
    }
  }

  //===================
  //wrappers to interact with dispatches
  function addCardToDealer(card) {
    const newCard = new Card(card[0].suit, card[0].value, card[0].image);
    dealerDispatch({
      type: "addCard",
      payload: newCard,
    });
  }

  function addCardToPlayer(card) {
    const newCard = new Card(card[0].suit, card[0].value, card[0].image);
    playerDispatch({
      type: "addCard",
      payload: newCard,
    });
  }

  function resetPlayers() {
    playerDispatch({
      type: "reset",
    });
    dealerDispatch({
      type: "reset",
    });
  }
  //================

  function double() {
    //double bet//then
    if (
      playerVars.cards.length >= 2 &&
      !playerVars.stand &&
      playerVars.chips >= playerVars.betSize
    ) {
      drawCard(deckId, 1).then(addCardToPlayer);
      playerDispatch({ type: "double" });
      setTimeout(() => {
        dealerDispatch({ type: "setTurn" });
      }, 1000);
    }
    doubleSound();
  }

  function addToBet(event) {
    if (playerVars.cards.length === 0) {
      playerDispatch({
        type: "addBet",
        payload: Number(event.target.textContent),
      });
    }
  }

  const cardContainer = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const outerContainer = {
    display: "flex",
    flexDirection: "row",
    position: 'absolute',
    bottom: '30px',
  };

  const buttonContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <>
      <PageContainer>
        <GameContainer>
          {/* <p>deckId: {deckId}</p> */}

      {/* ===================== BUTTONS ===================== */}  
          <div style={outerContainer}>
            <div style={buttonContainer}>
              <Bet
                buttonFunc={() => {
                  if (bettingMode) setBettingMode(false);         
                  else setBettingMode(true);
                  betSound();
                }}
              />
              <Split buttonFunc={() => {splitSound();}} />

              <Stand
                buttonFunc={() => {
                  if (playerVars.cards.length >= 2 && !playerVars.stand) {
                    playerDispatch({ type: "stand" });
                    dealerDispatch({ type: "setTurn" });
                  }
                  standSound();
                }}
              />
              <Hit
                buttonFunc={() => {
                  if (playerVars.cards.length >= 2 && !playerVars.stand) {
                    drawCard(deckId, 1).then(addCardToPlayer);
                  }
                  setTimeout(() => {
                    hitSound();
                  }, 1000);
                }}
              />
              <Double buttonFunc={double} />
              <Deal buttonFunc={dealCards} />
            </div>
          </div>
         

          {/* ===================== CARDS ===================== */}
          <div style={cardContainer}>
            <div>
              <Hand
                dealer
                dealersTurn={dealerVars.turn}
                cards={dealerVars.cards}
                score={dealerVars.score}
                bust={dealerVars.bust}
              />
              <Hand
                cards={playerVars.cards}
                score={playerVars.score}
                bust={playerVars.bust}
                chips={playerVars.chips}
                betSize={playerVars.betSize}
              />
            </div>
          </div>
          {bettingMode && <Chips buttonFunc={addToBet} />}
        </GameContainer>
        <ChatContainer>
          <ChatBox playerBust={playerVars.bust} dealerBust={dealerVars.bust} />
        </ChatContainer>
      </PageContainer>
    </>
  );
};

export default CardTest;
