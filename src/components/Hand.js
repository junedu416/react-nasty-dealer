// import { AbsoluteCenter } from "@chakra-ui/layout";
import faceDownCard from "./../images/face-down-card.jpeg";
import { CenteredBox } from './styled-components';


const Hand = (props) => {
  const { dealer, cards, dealersTurn, score, bust, activeHand, splitHand } = props;
  const playerName = localStorage.getItem("username") || "Player"

// MOVED STYLING BACK INTO RETURN TO USE INDEX FOR SHIFTING.
  // const cardBack = {
  //   width: "90px",
  //   height: "128px",
  //   padding: "5px",
  //   border: "1px solid black",
  //   borderRadius: "9px",
  //   position: "relative",
  //   top: '-21px',
  //   backgroundClip: "content-box",
  //   boxShadow: "inset 0 0 0 9px white",
  // };

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
        <h2 style={{color: activeHand ? "red" : "black"}}>
          {dealer ? "Dealer: " : (splitHand ? `${playerName}(Hand 2): ` : `${playerName}: `)}
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
              // ====================== CARD STYLING ==========================
              <div key={index} style={{width: '100%'}}>
                {dealer && !dealersTurn && cards.length === 2 && index === 1 ? (
                  <img
                    alt={"face down card"}
                    src={faceDownCard}
                    style={{
                      width: "90px",
                      height: "128px",
                      padding: "5px",
                      border: "1px solid black",
                      borderRadius: "9px",
                      position: "relative",
                      top: '-21px',
                      right: `${(55 * index) + (40 * (index - 1))}px`,
                      backgroundClip: "content-box",
                      boxShadow: "inset 0 0 0 9px white",
                    }}
                  />
                ) : (
                  <>
                    {index === 0 ? (
                      <img
                        alt={`${card.value} ${card.suit}`}
                        src={card.imgString}
                        width={100}
                        style={{
                          position: "relative",
                          right: `${(-20 * index) + (20 * (index - 1))}px`,
                          // transform: [{ skewX: "20deg" }],
                          // trying to make card have perspective.
                        }}
                      />
                    ) : (
                      <img
                        alt={`${card.value} ${card.suit}`}
                        src={card.imgString}
                        style={{
                          width: "100px",
                          position: "relative",
                          right: `${(55 * index) + (20 * (index - 1))}px`,
                          top: `${-22 - (22 * (index - 1))}px`,
                          // transform: [{ skewX: "20deg" }]
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </CenteredBox>
    </div>
  );
};

export default Hand;
