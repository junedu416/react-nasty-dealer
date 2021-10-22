// import { AbsoluteCenter } from "@chakra-ui/layout";
import faceDownCard from "./../images/face-down-card.jpeg";
import { CenteredBox } from './styled-components';

const Hand = (props) => {
  const { dealer, cards, dealersTurn, score, bust } = props;
  const cardBack = {
    width: "135px",
    height: "197px",
    padding: "5px",
    border: "1px solid black",
    borderRadius: "9px",
    position: "relative",
    left: "-125px",
    backgroundClip: "content-box",
    boxShadow: "inset 0 0 0 9px white",
  };

  const bustedStyling = {
    color: "red",
    fontFamily: "helvetica",
    position: "relative",
    left: "20px",
    top: "-15px",
  };

  const scoreStyling = {
    display: "flex",
  };

  return (
    <div>
      {/* Displays cards */}
      <div style={scoreStyling}>
        <h2>
          {dealer ? "Dealer: " : "Player: "}
          {/* Displays score with aces as 11 if score is less than 21, else score with ace as 1
        Dont show points if no cards */}
          {score.highTotal >= 1 &&
            (score.highTotal > 21 ? score.lowTotal : score.highTotal)}
        </h2>
        <p style={bustedStyling}>{cards.length > 0 && bust && <h2>BUST!</h2>}</p>
      </div>
      <CenteredBox height='100%'>
        <div style={{ display: "flex" }}>
          {cards.map((card, index) => {
            return (
              <div key={index} style={{width: '100%', border: '2px solid black'}}>
                {dealer && !dealersTurn && cards.length === 2 && index === 1 ? (
                  <img
                    alt={"face down card"}
                    src={faceDownCard}
                    style={cardBack}
                  />
                ) : (
                  <>
                    {index === 0 ? (
                      <img
                        alt={`${card.value} ${card.suit}`}
                        src={card.imgString}
                        width={150}
                        style={{
                          alignSelf: 'center',
                        }}
                      />
                    ) : (
                      <img
                        alt={`${card.value} ${card.suit}`}
                        src={card.imgString}
                        style={{
                          width: "150px",
                          position: "relative",
                          left: `${-122 - (122 * (index - 1))}px`
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CenteredBox>
    </div>
  );
};

export default Hand;
