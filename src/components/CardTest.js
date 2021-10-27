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
import NewGame from "./buttons/NewGame";
import ClearBet from "./buttons/ClearBet";
import ChatBox from "./ChatBox";
import WarningMessage from "./WarningMessage";
import resultMessageReducer from "../utils/result-message-reducer";
import GameResultMessage from "./GameResultMessage";
import { tallySplitResults } from "../utils/util-functions";
import { TimerPositioning, CoinPosition, CoinStyle, Balance, MoneyHeading, DollarDisplay, GameContainer, ChatContainer, ButtonContainer, OuterContainer, CardContainer, PageContainer, MoneyBox } from "./styled-components";
import Timer from "./Timer";
import Chips from "./Chips";
import useSound from "use-sound";
import soundHit from "./sounds/deal-card.wav";
import soundDouble from "./sounds/bet-sound.mp3";
import soundSplit from "./sounds/split.mp3";
import soundDeal from "./sounds/deal.wav";
import soundStand from "./sounds/stand.wav";
import soundBet from "./sounds/bet-sound.mp3";
import soundLose from "./sounds/dealer-laugh.wav";
import soundWin from "./sounds/voice-cheer.wav";
import soundBJ from "./sounds/victory.wav"
import gameOver from "./sounds/game_over.mp3"
import soundPush from "./sounds/disappointment.wav"
import WinAmount from "./WinAmount";
import Coin from "../images/coin.png";

const CardTest = () => {
  // useSound hook
  const [hitSound] = useSound(soundHit);
  const [doubleSound] = useSound(soundDouble);
  const [dealSound] = useSound(soundDeal);
  const [standSound] = useSound(soundStand);
  const [splitSound] = useSound(soundSplit);
  const [betSound] = useSound(soundBet);
  const [BlackJackSound] = useSound(soundBJ);
  const [WinSound] = useSound(soundWin);
  const [LoseSound] = useSound(soundLose);
  const [PushSound] = useSound(soundPush);
  const [gameOverSound] = useSound(gameOver)

  // destrcuter timer function/components
  const {renderTimer, seconds, resetTimer} = Timer()
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

  //style for the inactive hand
  const inactiveStyle = {
    position: 'absolute',
    bottom: '100px',
    left: '-200px'
  }

  //initState for dealer and player
  const initialHand = {
    cards: [],
    score: {
      highTotal: 0,
      lowTotal: 0,
    },
    bust: false,
    stand: false,
    chips: retrieveChips(),
    betSize: 0,
    playerPaid: false,
    result: { win: false, condition: "" },
    curHand: 0,
    split: false,
    double: false
  };
  const [deckId, setDeckId] = useState("");

  const [bettingMode, setBettingMode] = useState(false);

  //State for dealer vars
  const [dealerVars, dealerDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "addCard": {
          const newScore = updateScore(action.payload.value, state.score);
          let newStand;
          if (state.cards.length === 1 && !state.turn) {
            newStand = false;
          } else {
            newStand = (newScore.highTotal >= 17 && newScore.highTotal <= 21) ||
            newScore.lowTotal >= 17
                ? true
                : false
          }
          return {
            ...state,
            cards: [...state.cards, action.payload],
            score:
              state.cards.length === 1 && !state.turn ? state.score : newScore,
            bust: newScore.lowTotal > 21 ? true : false,
            stand: newStand
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
            resultMessageDispatch({type: "lose", data: state.betSize})
            dealerDispatch({ type: "stand" });
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
          let newBet = state.betSize;
          if (state.split || state.double) newBet = newBet / 2;
          if (state.chips - newBet < 0) newBet = 0
          if (!action.payload)
            localStorage.setItem("chips", action.payload ? 1000 : state.chips);
          return { ...initialHand, betSize: newBet };
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
            double: true
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
        case "clearBet": {
          return {
            ...state,
            betSize: 0
          }
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
            result[action.payload[1]] = {win: false, condition: action.payload[0]}
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
          console.log(resultMessage)
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
          resultMessageDispatch({type: "blackjack", data: playerVars.betSize})
        } else {
          playerDispatch({ type: "addChips", payload: playerVars.betSize * 2 });
          resultMessageDispatch({type: "win", data: playerVars.betSize});
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
        } else if(playerScore > 21) {
          playerDispatch({type: 'loseToDealer', payload: "lose_to_dealer"});
        }else if (playerScore > dealerScore && playerScore <= 21) {
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
    playerVars.cards,
    dealerVars.score,
    playerVars.score,
    playerVars.split
  ]);

  //========prevent dealer's turn when double + bust=======
  useEffect(() => {
    if (playerVars.double && !playerVars.bust && playerVars.cards.length === 3) {
      dealerDispatch({type: "setTurn"})
    }
  }, [playerVars.double, playerVars.cards, playerVars.bust])

  // game over when no more chips left
  useEffect(() => {
    if(playerVars.chips === 0 && playerVars.betSize === 0) {
      resultMessageDispatch({type: 'game_over'});
    }
  }, [playerVars.chips, playerVars.betSize])

  function retrieveChips() {
    const chips = (localStorage.getItem("chips"));
    if (!chips) return 1000;
    return Number(chips);
    //return isNaN(chips) ? 1000 : chips;
  }

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


  // set game Result state for GameResultMessage Component
  useEffect(() => {
    let actionType="";
    if(dealerVars.stand && playerVars.stand) {
      if (playerVars.split && playerVars.curHand === 1) {
          let resultTally = tallySplitResults(playerVars.bust, playerVars.result);
          console.log(resultTally);
          if (resultTally.win === 2) {actionType = "split_both_win";}
          else if(resultTally.lose === 2) {actionType = "split_both_lose";}
          else if(resultTally.push === 2) {actionType = "push"}
          else if(resultTally.blackJack === 2) {actionType = "both_blackjack"}
          else if(resultTally.win === 1 && resultTally.lose === 1) {actionType = "split_win_lose"}
          else if(resultTally.win === 1 && resultTally.push === 1) {actionType = "split_win_push"}
          else if(resultTally.win === 1 && resultTally.blackJack === 1) {actionType = "split_blackjack_win"}
          else if(resultTally.lose === 1 && resultTally.push === 1) {actionType = "split_lose_push"}
          else if(resultTally.lose === 1 && resultTally.blackJack === 1) {actionType = "split_blackjack_lose"}
          else if(resultTally.push === 1 && resultTally.blackJack === 1) {actionType = "split_blackjack_push"}
      }
    }
    actionType && resultMessageDispatch({type: actionType, data: playerVars.betSize})
    return;
}, [playerVars.betSize, playerVars.split, playerVars.result, playerVars.bust, dealerVars.stand, playerVars.stand, playerVars.curHand])

  function canPlayerSplit(card1, card2) {
    if (card1.value === card2.value) return true;
    if (isNaN(card1.value) && isNaN(card2.value)) return true;
    if (isNaN(card1.value) && card2.value === "10") return true;
    if (card1.value === "10" && isNaN(card2.value)) return true;
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
      }, 1400);
      setTimerMode(true)
      resetTimer();
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
      doubleSound();
      setTimerMode(false);
    }
  }

  function addToBet(event) {
    if (playerVars.cards.length === 0) {
      playerDispatch({
        type: "addBet",
        payload: event.target.nodeName === "IMG" ? parseInt(event.target.alt) : parseInt(event.target.value),
      });
      betSound()
    }
  }

// bring sound effects when player lose/win/get blackjack
useEffect(() => {
  if (resultMessage.result === "WIN") WinSound();
  else if (resultMessage.result === "BLACKJACK") BlackJackSound()
  else if (resultMessage.result === "LOSE") LoseSound();
  else if (resultMessage.result === "PUSH")  PushSound();
  else if (resultMessage.result === "GAME OVER. GO HOME") gameOverSound();
},[resultMessage.result, WinSound, BlackJackSound, LoseSound,
  PushSound, gameOverSound])

  /*const inactiveHandStyling = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
  };

  const activeHandStyling = {
    border: '8px solid red',
  }*/

  return (
    <>

      <PageContainer>
        <GameContainer>
          {/* <p>deckId: {deckId}</p> */}

          {warning && <WarningMessage message={warning} closeWarning={closeWarning}/>}
          {resultMessage.result && <GameResultMessage resultMessage={resultMessage} />}
          {resultMessage.result && resultMessage.result === "GAME OVER. GO HOME" &&
          <button onClick={() => {
            localStorage.setItem("chips", 1000);
            playerDispatch({type: "reset", payload: true});
          }}>Give me a small loan</button>}
      {/* ===================== BUTTONS ===================== */}
          <OuterContainer>
            <ButtonContainer>
              {/*SPLIT*/}
              {playerVars.cards.length === 2 &&
               canPlayerSplit(...playerVars.cards) &&
               !playerVars.split && !playerVars.stand &&
               !playerVars.split &&
               <Split buttonFunc={() => {
                 if (playerVars.chips >= playerVars.betSize) {
                    playerDispatch({type:"splitCards"});
                    splitSound();
                    setTimerMode(false);
                    }}} />}
              {/*STAND*/}
             {!playerVars.stand && playerVars.cards.length > 0 &&
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
              />}
              {/*HIT*/}
              {!playerVars.stand && playerVars.cards.length > 0 &&
              <Hit
                buttonFunc={() => {
                  if (playerVars.cards.length >= 2) {
                    drawCard(deckId, 1).then(addCardToPlayer);

                    setTimeout(() => {
                      hitSound();
                    }, 1000);
                    resetTimer();
                    setTimerMode(true)
                  }
                }}
              />}
              {/*DOUBLE*/}
              {playerVars.cards.length === 2 && !playerVars.split &&
              playerVars.score.highTotal !== 21 && !playerVars.stand &&
               <Double buttonFunc={double} />}
              {/*CLEARBET*/}
              {playerVars.cards.length === 0 && <ClearBet buttonFunc={() => {
                  playerDispatch({type: "clearBet"})
              }} />}
              {/*BET*/}
              {playerVars.cards.length === 0 && <Bet
                buttonFunc={() => {
                  if (bettingMode) setBettingMode(false);
                  else setBettingMode(true);
                }}
              />}
              {/*DEAL*/}
              {playerVars.cards.length === 0 && <Deal buttonFunc={dealCards} />}
              {/*NEWGAME*/}
              {((playerVars.stand && dealerVars.stand) ||
              (!playerVars.split && playerVars.stand && playerVars.cards.length === 2 && playerVars.score.highTotal === 21) ||
              (playerVars.split && playerVars.stand)) &&
              <NewGame buttonFunc={dealCards} />}
            </ButtonContainer>
          </OuterContainer>

          {/* ===================== CARDS ===================== */}
          <CardContainer>
          <MoneyBox>
            <Balance>
              <DollarDisplay style={{borderRadius: '50px', textAlign: 'right', color: '#ffff00', fontSize:'1.7rem', paddingRight: '20px', width: '250px'}}>${(playerVars.chips).toLocaleString()}</DollarDisplay>
              <CoinPosition><CoinStyle src={Coin} alt="chip balance icon" /></CoinPosition>
            </Balance>
            <MoneyHeading>BET: </MoneyHeading>
            <DollarDisplay>${(playerVars.betSize).toLocaleString()}</DollarDisplay>
            <MoneyHeading>{resultMessage.winAmount >= 0 ? "WIN:":"LOSE:"}</MoneyHeading>
            <DollarDisplay><WinAmount amount={resultMessage.winAmount}/></DollarDisplay>

          </MoneyBox>
            <Hand
              dealer
              dealersTurn={dealerVars.turn}
              cards={dealerVars.cards}
              score={dealerVars.score}
              bust={dealerVars.bust}
            />
            <div style={playerVars.curHand === 0 ? {} : inactiveStyle}>
              <Hand
                cards={playerVars.split ? playerVars.cards[0] : playerVars.cards}
                score={playerVars.split ? playerVars.score[0] : playerVars.score}
                bust={playerVars.split ? playerVars.bust[0] : playerVars.bust}
                activeHand={playerVars.curHand === 0}
              />
            </div>
            {playerVars.split && (
              <div style={playerVars.curHand === 1 ? {} : inactiveStyle} >
                <Hand
                  cards={playerVars.cards[1]}
                  score={playerVars.score[1]}
                  bust={playerVars.bust[1]}
                  activeHand={playerVars.curHand === 1}
                  splitHand
                />
              </div>

            )}
             {/* style={activeHand ? {activeHandStyling} : {inactiveHandStyling}} */}
          </CardContainer>

           {/* rendering timer */}
          <TimerPositioning>
            {timerMode && !playerVars.bust && !dealerVars.bust && renderTimer}
          </TimerPositioning>
          {bettingMode && <Chips buttonFunc={addToBet} />}
          <ChatContainer>
            <ChatBox playerBust={playerVars.bust} split={playerVars.split} curHand={playerVars.curHand} gameResult={playerVars.result} timerMode={timerMode} secondsLeft ={seconds}/>
          </ChatContainer>
        </GameContainer>
      </PageContainer>
    </>
  );
};

export default CardTest;
