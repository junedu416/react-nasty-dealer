const Hand = (props) => {
    const {dealer, cards, score, dealersTurn} = props;

    return (
        <div>
            {/* Displays cards */}
            <h2>{dealer ? "Dealer's" : "Player's"} Cards:</h2>
            {cards.map((card, index) => {
                return (
                <div key={index}>
                    <p>
                        {card.value} {card.suit}
                    </p>
                    { dealer && !dealersTurn && cards.length === 2 && index === 1 ?
                        <img alt={"face down card"} src={""} />
                        :
                        <img alt={`${card.value} ${card.suit}`} src={card.imgString} />
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