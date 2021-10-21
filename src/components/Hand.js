import { useEffect, useState } from "react";
import faceDownCard from "./../images/face-down-card.jpeg"

const Hand = (props) => {
    const {dealer, cards, dealersTurn} = props;
    const [score, setScore] = useState({
        softTotal: 0,
        hardTotal: 0
    });

    //Originally calculateScore()
    useEffect(() => {
        // calculates score for aces
        let newScore = {
            softTotal: 0,
            hardTotal: 0
        };
        for (let i = 0; i < (dealer && !dealersTurn && cards.length === 2 ? 1 : cards.length); i++) {
            let value = cards[i].value;
            if (value === "ACE") {
                newScore.hardTotal += 1;
                newScore.softTotal += newScore.softTotal + 11 > 21 ? 1 : 11;
            } else if (isNaN(value) === true) {
                // face cards
                newScore.hardTotal += 10;
                newScore.softTotal += 10;
            } else {
                // number cards
                value = parseInt(value)
                newScore.hardTotal += value;
                newScore.softTotal += value;
            }
            console.log(value, newScore);
        }
        setScore(newScore);
    }, [cards, dealer, dealersTurn])

    return (
        <div>
            {/* Displays cards */}
            <h2>{dealer ? "Dealer's" : "Player's"} Cards:</h2>
            {cards.map((card, index) => {
                return (
                <div key={index}>
                    { dealer && !dealersTurn && cards.length === 2 && index === 1 ?
                        <img alt={"face down card"} src={faceDownCard} width={225}/>
                        :
                        <>
                        <p>
                            {card.value} {card.suit}
                        </p>
                        <img alt={`${card.value} ${card.suit}`} src={card.imgString} />
                        </>
                    }
                </div>
                );
            })}
            {/* Displays score with aces as 11 if score is less than 21, else score with ace as 1 */}
            <h2>Points: {(score.softTotal > 1) && (score.softTotal > 21 ? score.hardTotal : score.softTotal)}</h2>
        </div>
    )
}

export default Hand;