import { useEffect, useState } from "react";
import faceDownCard from "./../images/face-down-card.jpeg";

const Hand = (props) => {
  const { dealer, cards, dealersTurn } = props;
  const [score, setScore] = useState({
    highTotal: 0,
    lowTotal: 0,
  });
  const [bust, setBust] = useState(false);

  //Originally calculateScore
  useEffect(() => {
    // calculates score for aces
    let newScore = {
      highTotal: 0,
      lowTotal: 0,
    };
    for (
      let i = 0;
      i < (dealer && !dealersTurn && cards.length === 2 ? 1 : cards.length);
      i++
    ) {
      let value = cards[i].value;
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
    }
    setScore(newScore);
  }, [cards, dealer, dealersTurn]);

  useEffect(() => {
    if (score.lowTotal > 21) {
      setBust(true);
    } else {
      setBust(false);
    }
  }, [score])

  return (
    <div>
      {/* Displays cards */}
      <h2>{dealer ? "Dealer's" : "Player's"} Cards:</h2>
      <div style={{display: "flex"}}>
        {cards.map((card, index) => {
          return (
            <div key={index}>
              {dealer && !dealersTurn && cards.length === 2 && index === 1 ? (
                <img alt={"face down card"} src={faceDownCard} width={225} />
              ) : (
                <>
                  {/* <p>
                    {card.value} {card.suit}
                  </p> */}
                  <img
                    alt={`${card.value} ${card.suit}`}
                    src={card.imgString}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Displays score with aces as 11 if score is less than 21, else score with ace as 1 */}
      {/* Dont show points if no cards*/}
      {cards.length > 0 &&
      <h2>
        Points:{" "}
        {score.highTotal > 1 &&
          (score.highTotal > 21 ? score.lowTotal : score.highTotal)}
      </h2>}
      {bust && <h2>Bust!</h2>}
    </div>
  );
};

export default Hand;
