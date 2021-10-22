import faceDownCard from "./../images/face-down-card.jpeg";

const Hand = (props) => {
  const { dealer, cards, dealersTurn, score, bust } = props;

  return (
    <div>
      {/* Displays cards */}
      <h2>{dealer ? "Dealer: " : "Player: "}
      {/* Displays score with aces as 11 if score is less than 21, else score with ace as 1
      Dont show points if no cards */}
        {score.highTotal >= 1 &&
          (score.highTotal > 21 ? score.lowTotal : score.highTotal)}
          {(cards.length > 0 && (bust && <h2>Bust!</h2>))}</h2>
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
    </div>
  );
};

export default Hand;
