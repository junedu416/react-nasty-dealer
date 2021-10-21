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
      console.log(value, newScore);
    }

    setScore(newScore);
  }, [cards, dealer, dealersTurn]);

  // State for bust
  useEffect(() => {
    if(calculateTotal(score) > 21) setBust(true); 
  }, [score])

  function calculateTotal(score) {
    if (score.lowTotal === 21 || score.highTotal === 21) return 21;
    else if (score.highTotal > 21) return score.lowTotal;

    return score.highTotal;
  }

  function isBust() {
    if (calculateTotal(score) > 21) {
    //   setBust(true);
      return true;
    }
    return false;
  }

  function getWinner(playerScore, dealerScore) {
    switch (true) {
      case playerScore === dealerScore:
      case playerScore > 21 && dealerScore > 21:
        return null;
      case playerScore > 21:
      case dealerScore > playerScore && dealerScore <= 21:
        return false;
      default:
        return true;
    }
  }

  return (
    <div>
      {/* Displays cards */}
      <h2>
        {dealer ? "Dealer: " : "Player: "}
        {/* Displays score with aces as 11 if score is less than 21, else score with ace as 1 */}
        {score.highTotal > 1 &&
          (score.highTotal > 21 ? score.lowTotal : score.highTotal)}
        {isBust() ? " BUST!" : ""}
      </h2>

      <div style={{ display: "flex" }}>
        {cards.map((card, index) => {
          return (
            <div key={index}>
              {dealer && !dealersTurn && cards.length === 2 && index === 1 ? (
                <img alt={"face down card"} src={faceDownCard} width={225} />
              ) : (
                <>
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
    </div>
  );
};

export default Hand;
