import { AbsoluteCenter } from "@chakra-ui/layout";
import faceDownCard from "./../images/face-down-card.jpeg";

const Hand = (props) => {
  const { dealer, cards, dealersTurn, score, bust } = props;
  const cardBack = {
    width:'135px',
    height:'197px',
    padding:'5px',
    border:'1px solid black',
    borderRadius:'9px',
    position: 'absolute',
    left: '50px',
    backgroundClip: 'content-box',
    boxShadow: 'inset 0 0 0 9px white'
  }

  const faceUpCard = {
    width:'150px',
    position: 'absolute',
    left: '50px'
  }

  const busted = {
    color: 'red',
    fontFamily: 'helvetica',
    position: 'absolute',
    left: '200px',
    top: '400px',
    // border: '1px solid red',
  }

  const scoreStyling = {
    display: 'flex',
    // border: '1px solid red',
  }

  return (
    <div>
      {/* Displays cards */}
      <h2 style={scoreStyling}>{dealer ? "Dealer: " : "Player: "}
      {/* Displays score with aces as 11 if score is less than 21, else score with ace as 1
      Dont show points if no cards */}
        {score.highTotal >= 1 &&
          (score.highTotal > 21 ? score.lowTotal : score.highTotal)}
        <p style={busted}>{(cards.length > 0 && (bust && <h2>BUST!</h2>))}</p>
      </h2>
      <div style={{display: "flex"}}>
        {cards.map((card, index) => {
          return (
            <div key={index}>
              {dealer && !dealersTurn && cards.length === 2 && index === 1 ? (
                <img alt={"face down card"} src={faceDownCard} style={cardBack}  />
              ) : (
                <>
                  {index === 0 ? <img
                    alt={`${card.value} ${card.suit}`}
                    src={card.imgString}
                    width={150} /> 
                  : 
                  <img
                    alt={`${card.value} ${card.suit}`}
                    src={card.imgString}
                    style={faceUpCard} />
                  }
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
