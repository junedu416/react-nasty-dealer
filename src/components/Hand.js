// import { AbsoluteCenter } from "@chakra-ui/layout";
import faceDownCard from "./../images/face-down-card.jpeg";
import { CenteredBox, ScorePositioning } from "./styled-components";

const Hand = (props) => {
  const { dealer, cards, dealersTurn, score, bust, activeHand, splitHand } =
    props;
  const playerName = localStorage.getItem("username") || "Player";

  const bustedStyling = {
    color: "red",
    fontFamily: "helvetica",
    position: "relative",
    left: "20px",
    // top: "-15px",
  };

  const scoreStyling = {
    display: "flex",
  };

  return (
    <div>
      {/* Displays cards */}
      <div style={scoreStyling}>
        <h2 style={{ color: activeHand ? "red" : "black" }}>
          {dealer
            ? "Dealer: "
            : splitHand
            ? `${playerName}(Hand 2): `
            : `${playerName}: `}
          {/* Displays score with aces as 11 if score is less than 21, else score with ace as 1
        Dont show points if no cards */}
          {score.highTotal >= 1 &&
            (score.highTotal > 21 ? score.lowTotal : score.highTotal)}
        </h2>
        <h2 style={bustedStyling}>
          {cards.length > 0 && bust && `BUST!`}
        </h2>
      </div>
      {/* {dealer ? "Dealer: " : splitHand ? `${playerName}(Hand 2): ` : `${playerName}: `}
      (<ScorePositioning>
        {score.highTotal >= 1 &&
            (score.highTotal > 21 ? score.lowTotal : score.highTotal)}
      </ScorePositioning>) */}
      <CenteredBox height="100%">
        <div style={{ display: "flex" }}>
          {cards.map((card, index) => {
            return (
              // ====================== CARD STYLING ==========================
              <div key={index} style={{ width: "100%" }}>
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
                      transform: "translate(-60px, 60px) rotateX(-48deg) rotateY(3deg) rotate(-4deg) skewX(-9deg) skewY(7deg)",

                      // top: '62px',
                      // right: `${(55 * index) + (40 * (index - 1))}px`,
                      backgroundClip: "content-box",
                      // boxShadow: "-1px 3px 6px black",
                      boxShadow: "inset 0 0 0 9px white, -1px 3px 6px black",
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
                          // transform: "translate(20px, 0px)",
                          transform: "skewX(-13deg) skewY(6deg) rotateX(-48deg) rotateY(3deg) rotate(-4deg) translate(20px, 12px)",
                          boxShadow: "-1px 3px 6px black",
                          // right: `${(-20 * index) + (20 * (index - 1))}px`,
                          // transform: [{ skewX: "20deg" }],
                          top: "70px",

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
                          // transform: `translate(${
                          //   -55 * index - 20 * (index - 1)
                          // }px, ${50 + -20 * (index - 1)}px)`,

                          transform: `skewX(-13deg) skewY(6deg) rotateX(-48deg) rotateY(3deg) rotate(-4deg)`,
                          boxShadow: "-1px 3px 6px black",

                          right: `${(55 * index) + (20 * (index - 1))}px`,
                          top: `${60 - (22 * (index - 1))}px`,
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
