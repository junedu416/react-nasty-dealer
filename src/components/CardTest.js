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
import WarningMessage from "./WarningMessage";
import resultMessageReducer from "../utils/result-message-reducer";
import GameResultMessage from "./GameResultMessage";


import { GameContainer, ChatContainer, CenteredBox, PageContainer } from "./styled-components";

import Timer from "./Timer";

import Chips from "./Chips";
import useSound from "use-sound";
import soundHit from "./sounds/card-flick.wav";
import soundDouble from "./sounds/bonus.wav";
import soundSplit from "./sounds/split.mp3";
import soundDeal from "./sounds/deal.wav";
import soundStand from "./sounds/stand.wav";
import soundBet from "./sounds/clinking-coins.wav";
import Player from './MusicPlayer'

const CardTest = () => {
  // useSound hook
  const [hitSound] = useSound(soundHit);
  const [doubleSound] = useSound(soundDouble);
  const [dealSound] = useSound(soundDeal);
  const [standSound] = useSound(soundStand);
  const [splitSound] = useSound(soundSplit);
  const [betSound] = useSound(soundBet);

  // destrcuter timer function/components
  const {renderTimer, seconds} = Timer();
  // set button clicked bool for timer use
  const [timerMode, setTimerMode] = useState(false)

  // state for warning message e.g. "No bet, No deal"
  const [warning, setWarning] = useState("")
  function closeWarning (e) {
    e.preventDefault();
    setWarning("")
  }

  // state used for GameResultMessage component. reducer function defined in utils/
  const [resultMessage, resultMessageDispatch] = useReducer(resultMessageReducer, {result:"", winAmount: 0})

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
    result: { win: false, condition: "" },
    curHand: 0,
    split: false,
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
            (newScore.highTotal >= 17 && newScore.highTotal <= 21) ||
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

  //state for playerVars
  const [playerVars, playerDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "addCard": {
          if (state.split) {
            const newCards = [...state.cards];
            newCards[state.curHand] = [...state.cards[state.curHand], action.payload]
            const newScore = [...state.score];
            newScore[state.curHand] = updateScore(action.payload.value, state.score[state.curHand]);
            const bust = [...state.bust]
            bust[state.curHand] = newScore[state.curHand].lowTotal > 21;

            return {
              ...state,
              cards: newCards,
              score: newScore,
              bust: bust

            }
          }

          const newScore = updateScore(action.payload.value, state.score);
          const bust = newScore.lowTotal > 21;
          let blackjack = false;
          if (newScore.highTotal === 21 && state.cards.length + 1 === 2) {
            blackjack = true;
            console.log("blackjack");
            dealerDispatch({ type: "stand" });
          }
          if (bust) {
            dealerDispatch({ type: "stand" });
            resultMessageDispatch({type: 'player_bust', data: state.betSize});
          }
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
          resultMessageDispatch({type: 'reset'});
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
          if (state.split) {
            const result = [...state.result]
            result[action.payload[1]] = {win: true, condition: action.payload[0]}
            console.log(`hand ${action.payload[1]} wins with condition ${action.payload[0]}`)
            return {
              ...state,
              result: result
            }
          }
          return {
            ...state,
            result: { win: true, condition: action.payload },
          };
        }
        case "pushResult": {
          if (state.split) {
            console.log("nobody wins hand", action.payload[1], "betSize", state.betSize, "added back to ", state.chips)
            const result = [...state.result];
            result[action.payload[1]] = {win: false, condition: action.payload}
            return {
              ...state,
              chips: state.chips + state.betSize,
              result: result
            }
          }
          console.log("nobody wins, betSize", state.betSize, "added back to ", state.chips)
          resultMessageDispatch({type: "push"})
          return {
            ...state,
            chips: state.chips + state.betSize,
            result: { win: false, condition: action.payload }
          };
        }

        case "splitCards": {
          const emptyScore = {highTotal: 0, lowTotal: 0}
          const newCards = [[state.cards[0]], [state.cards[1]]]
          const newScore = [updateScore(newCards[0][0].value, emptyScore), updateScore(newCards[1][0].value, emptyScore)]
          return {
            ...state,
            cards: newCards,
            score: newScore,
            split: true,
            bust: [false, false],
            result: [{win: false, reason: ""}, {win: false, reason: ""}],
            betSize: state.betSize * 2,
            chips: state.chips - state.betSize
          }
        }
        case "addCardsOnSplit": {
          return {
            ...state,
            cards: [[state.cards[0][0], action.payload[0]],[state.cards[1][0], action.payload[1]]],
            score: [updateScore(action.payload[0].value, state.score[0]),
                    updateScore(action.payload[1].value, state.score[1])]
          }
        }
        case "incrementHand": {
          return {
            ...state,
            curHand: state.curHand + 1
          }
        }
        case "loseToDealer": {
          if (state.split) {
            console.log("both player and dealer's hand under 21 for hand", action.payload[1], "player loses", state.betSize);
            const result = [...state.result];
            result[action.payload[1]] = {win: false, condition: action.payload[0]}
            return {
              ...state,
              result: result
            }
          }
          console.log("both player and dealer's hand under 21. player loses", state.betSize);
          resultMessageDispatch({type: "lose", data: state.betSize})
          return {
            ...state,
            result: {win: false, condition: action.payload}
          }
        }
        default: {
          throw new Error("Invalid action for Player");
        }
      }
    },
    { ...initialHand }
  );
  //fill players hands when split
  useEffect(() => {
    if (playerVars.split && playerVars.cards[0].length === 1) {
      drawCard(deckId, 2).then((cards) => addCardsOnSplit(cards));
    }
  },[playerVars.split, playerVars.cards, playerVars.score, deckId])

  //move on to next hand or end game when bust
  useEffect(() => {
    if (playerVars.split) {
      if (playerVars.bust[0] && playerVars.curHand === 0) {
        playerDispatch({type: "incrementHand"});
      } else if (playerVars.bust[1] && playerVars.curHand === 1) {
        playerDispatch({type: "stand"})
        if (!playerVars.bust[0]) dealerDispatch({type: "setTurn"})
      }
    }
  }, [playerVars.bust, playerVars.split, playerVars.curHand])

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
    if (playerVars.split) {
      playerVars.result.forEach(result => {
        if (result.win) {
          if (result.condition === "blackjack") {
            playerDispatch({type: "addChips", payload: (playerVars.betSize / 2) * 2.5})
          } else {
            playerDispatch({type: "addChips", payload: (playerVars.betSize / 2) * 2})
          }
        }
      })
    } else {
      if (playerVars.result.win && !playerVars.paid) {
        if (playerVars.result.condition === "blackjack") {
          playerDispatch({ type: "addChips", payload: playerVars.betSize * 2.5 });
          resultMessageDispatch({type: "blackjack", data: playerVars.betSize * 2.5})
        } else {
          playerDispatch({ type: "addChips", payload: playerVars.betSize * 2 });
          resultMessageDispatch({type: "win", data: playerVars.betSize * 2});
        }
      }
    }
  }, [
    playerVars.result,
    playerVars.score,
    playerVars.cards,
    playerVars.betSize,
    playerVars.paid,
    playerVars.split
  ]);

  useEffect(() => {
    function getFinalScore(score) {
      if (score.highTotal === 21 || score.lowTotal === 21)
        return 21;
      if (
        score.highTotal < 21 &&
        score.highTotal > score.lowTotal
      )
        return score.highTotal;
      return score.lowTotal;
    }


    if (playerVars.split) {
      if (dealerVars.stand && playerVars.stand) {
        const dealerScore = getFinalScore(dealerVars.score);
        playerVars.score.forEach((score, index) => {
          const playerScore = getFinalScore(score);
          if (playerScore === 21 && playerVars.cards[index].length === 2) {
            playerDispatch({ type: "changeResult", payload: ["blackjack", index ]});
          } else if (playerScore > dealerScore && playerScore <= 21) {
            playerDispatch({ type: "changeResult", payload: ["beat_dealer", index] });
          } else if (playerScore <= 21 && dealerScore > 21) {
            playerDispatch({ type: "changeResult", payload: ["dealer_bust", index ]});
          } else if (playerScore === dealerScore) {
            playerDispatch({type: "pushResult", payload: ["push", index] });
          } else if (playerScore < dealerScore) {
            playerDispatch({type: "loseToDealer", payload: ["lose_to_dealer", index]});
          }
        });
      }
    } else {
      if (dealerVars.stand && playerVars.stand) {
        const playerScore = getFinalScore(playerVars.score);
        const dealerScore = getFinalScore(dealerVars.score);
        if (playerScore === 21 && playerVars.cards.length === 2) {
          playerDispatch({ type: "changeResult", payload: "blackjack" });
        } else if (playerScore > dealerScore && playerScore <= 21) {
          playerDispatch({ type: "changeResult", payload: "beat_dealer" });
        } else if (playerScore <= 21 && dealerScore > 21) {
          playerDispatch({ type: "changeResult", payload: "dealer_bust" });
        } else if (playerScore === dealerScore) {
          playerDispatch({type: "pushResult", payload: "push" });
        } else if (playerScore < dealerScore) {
        playerDispatch({type: "loseToDealer", payload: "lose_to_dealer"});
        }
      }
    }
  }, [
    playerVars.stand,
    dealerVars.stand,
    playerVars.cards.length,
    dealerVars.score,
    playerVars.score,
    playerVars.split
  ]);

  useEffect(() => {
    if(playerVars.chips === 0 && playerVars.betSize === 0) {
      resultMessageDispatch({type: 'game_over'});
    }
  }, [playerVars.chips, playerVars.betSize])

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

  function canPlayerSplit(card1, card2) {
    if (card1.value === card2.value) return true;
    if (isNaN(card1.value) && isNaN(card2.value)) return true;
    if (isNaN(card1.value) && card2.value === 10) return true;
    if (card1.value === 10 && isNaN(card2.value)) return true;
  }

  //draw 2 cards for player then for dealer
  function dealCards() {
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

      setTimeout(() => {
        dealSound();
      }, 1200);
      setTimerMode(true)
    } else if (playerVars.stand || playerVars.bust) {
      console.log("no dealio");
      resetPlayers();
    } else if (playerVars.betSize === 0) {
      console.log("no chips, no play, no game today");
      setWarning("No chips, no play, no game today");
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

  function addCardsOnSplit(cards) {
    console.log(cards);
    const cardOne = new Card(cards[0].suit, cards[0].value, cards[0].image);
    const cardTwo = new Card(cards[1].suit, cards[1].value, cards[1].image);
    playerDispatch({
      type: "addCardsOnSplit",
      payload: [cardOne, cardTwo]
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
    if (
      playerVars.cards.length >= 2 &&
      !playerVars.stand &&
      playerVars.chips >= playerVars.betSize &&
      !playerVars.split
    ) {
      drawCard(deckId, 1).then(addCardToPlayer);
      playerDispatch({ type: "double" });
      setTimeout(() => {
        dealerDispatch({ type: "setTurn" });
      }, 1000);
      doubleSound();
      setTimerMode(false);
    }
  }

  function addToBet(event) {
    if (playerVars.cards.length === 0) {
      playerDispatch({
        type: "addBet",
        payload: Number(event.target.textContent),
      });
      betSound()
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

          {warning && <WarningMessage message={warning} closeWarning={closeWarning}/>}
          {resultMessage.result && <GameResultMessage resultMessage={resultMessage} />}
      {/* ===================== BUTTONS ===================== */}
          <div style={outerContainer}>
            <div style={buttonContainer}>
              <Bet
                buttonFunc={() => {
                  if (bettingMode) setBettingMode(false);
                  else setBettingMode(true);
                }}
              />
              <Split buttonFunc={() => {
                if (!playerVars.split && canPlayerSplit(...playerVars.cards)) { //remove this if statement to test split on any 2 cards
                  playerDispatch({type:"splitCards"});
                  splitSound();
                  setTimerMode(false);
                }}} />
              <Stand
                buttonFunc={() => {
                  if (playerVars.split) {
                    if (playerVars.curHand === 0) {
                      playerDispatch({type: "incrementHand"})
                    } else {
                      playerDispatch({ type: "stand" });
                      dealerDispatch({ type: "setTurn" });
                    }
                  } else if (playerVars.cards.length >= 2 && !playerVars.stand) {
                    playerDispatch({ type: "stand" });
                    dealerDispatch({ type: "setTurn" });
                    standSound();
                    setTimerMode(false)
                  }

                }}
              />
              <Hit
                buttonFunc={() => {
                  if (playerVars.cards.length >= 2 && !playerVars.stand) {
                    drawCard(deckId, 1).then(addCardToPlayer);

                    setTimeout(() => {
                      hitSound();
                    }, 1000);
                    setTimerMode(false)
                    setTimeout(() => {
                      setTimerMode(true)
                    }, 300);
                  }
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
                cards={playerVars.split ? playerVars.cards[0] : playerVars.cards}
                score={playerVars.split ? playerVars.score[0] : playerVars.score}
                bust={playerVars.split ? playerVars.bust[0] : playerVars.bust}
                chips={playerVars.chips}
                betSize={playerVars.betSize}
                activeHand={playerVars.split && playerVars.curHand === 0}
              />
              {playerVars.split && <Hand
                cards={playerVars.cards[1]}
                score={playerVars.score[1]}
                bust={playerVars.bust[1]}
                chips={playerVars.chips}
                betSize={[playerVars.betSize]}
                activeHand={playerVars.curHand === 1} />}
            </div>
          </div>
          {timerMode && bettingMode && !playerVars.bust && !dealerVars.bust && renderTimer}
          {bettingMode && <Chips buttonFunc={addToBet} />}
        </GameContainer>
        <Player/>
        <ChatContainer>
          <ChatBox playerBust={playerVars.bust} split={playerVars.split} gameResult={playerVars.result} timerMode={timerMode} secondsLeft ={seconds}/>
        </ChatContainer>
      </PageContainer>
    </>
  );
};

export default CardTest;
