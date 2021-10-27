import styled from "styled-components";
import Table from "../../images/table.jpg";

export const AppBodyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 1080px;
  max-width: 1920px;
  overflow: hidden;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: 90vh;
  max-width: 1960px;
  max-height: 1080px;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  background-image: url(${Table});
  /* background: url(${Table}) no-repeat center center fixed; */
  background-size: cover;
`;

export const CenteredBox = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: ${(props) => (props.height ? props.height : "90vh")};
  max-width: 1960px;
  max-height: 1080px;
  width: 70vw;
  align-items: center;
  margin: 0 auto;
  /* border: 5px solid black; */
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100%;
  max-height: 1080px;
  width: 100vw;
  align-items: center;
`;

export const ChatContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 26%;
  height: 88vh;
  bottom: 0px;
  right: -8px;
  padding: 10px;
  opacity: 1;
  overflow: hidden;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #cfefef;
  border-radius: 10px;
  overflow: hidden;

  @keyframes inAnimation {
    0% {
      opacity: 0;
      transform: translateY(92%);
    }
    100% {
      opacity: 1;
      transform: translateY(92%);
    }
  }

  @keyframes outAnimation {
    0% {
      opacity: 1;
      transform: translateY(-100vh);
    }
    100% {
      opacity: 0;
      transform: translateY(-100vh);
      /* transform: scaleY(-1); */
    }
  }
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 90vh;
  overscroll-behavior-y: contain;
  scroll-snap-type: y-proximity;
  background-color: rgb(255, 255, 255, 0.25);
  margin: 10px 10px 10px 10px;
  padding: 10px 10px 0 10px;
  border-radius: 5px;
`;

export const CommentBox = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const CommentButton = styled.button`
  outline: none;
  padding: 0px;
  margin: 0 10px 0 10px;
  background: transparent;
  border: 0px solid transparent;
  background: transparent;
  transition: 0.2s all;

  &:hover {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const ShowChat = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
  background: rgb(0, 0, 0, 0.4);
  /* background: red; */
  padding: 10px;
  border-radius: 8px;
  opacity: 0.9;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  @keyframes fadeAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const ChipButton = styled.button`
  background: transparent;
  border: 0px solid transparent;
  background: transparent;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    transform: scale(1.4);
  }
`;

export const ChipContainer = styled.div`
  margin-left: 10px;
  margin-bottom: 0px;
  display: flex;
  padding: 4px 10px;
  border-radius: 10px;
  background: rgb(0, 20, 25, 0.6);
  position: absolute;
  bottom: 10vh;
  border: 2px ridge gold;
`;

export const ChipImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const InfoButton = styled.img`
  width: 46px;
  height: 46px;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`;

export const HomeIcon = styled.img`
  width: 45px;
  height: 45px;
  margin-left: 15px;
  margin-right: 15px;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`;

export const SoundButton = styled.button`
  background: transparent;
  border: 0px solid transparent;
  background: transparent;
  width: 46px;
  height: 46px;
  margin: 0 15px 0 10px;
  opacity: 0.9;
  color: white;

  &:hover {
    opacity: 1;
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
  }
`;

export const SoundIcon = styled.img`
  width: 46px;
  height: 46px;
`;

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  /* left: 10px; */
  bottom: 4vh;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  z-index: 2;
`;

export const MoneyBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: center; */
  width: 200px;
  position: absolute;
  top: 80px;
  left: 0px;
  padding-left: 15px;
  /* background-color: rgb(100, 200, 255, 0.4); */
`;

export const MessagingIcon = styled.img`
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 60px;
  right: 20px;
`;

export const GoldText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: transparent;
  font-size: 6rem;
  font-family: Helvetica, sans-serif;
  letter-spacing: 5px;
  font-weight: 900;
  background-image: linear-gradient(
    #462523 0,
    #cb9b51 22%,
    #f6e27a 45%,
    #f6f2c0 50%,
    #cb9b51 78%,
    #462523 100%
  );
  z-index: 10;
  /* -webkit-text-stroke: 0.5px #fce291; */
  filter: drop-shadow(2px 2px 1px #a17000);
  /* filter: drop-shadow(3px 3px 4px black); */
  text-shadow: 0px 1px 0 #ffed98, 0px 2px 0 #fce291, 0px 3px 0 #ffd429,
    0px 4px 0 #e0ba22, 0px 5px 0 #d1a511, 0px 6px 0 #be9111, 0px 7px 0 #bf9131,
    0px 8px 0 #c69131, 0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);

  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
`;

export const MessageAlert = styled.h1`
  font-size: 5rem;
  color: ${(props) => (props.color ? props.color : "white")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-family: helvetica;
  padding: 60px 90px;
  z-index: 10;
  text-align: center;
  min-width: ${(props) => (props.characterLength > 8 ? "70vw" : "30vw")};
  max-width: 60vw;
  min-height: 15vh;
  max-height: 35vh;
  border-radius: 40px;
  background-color: rgb(0, 0, 0, 0.55);
  box-shadow: 0 0 10px rgb(0 0 0 / 0.1), 0 0 20px rgb(0 0 0 / 0.2),
    0 0 30px rgb(0 0 0 / 0.3), 0 0 40px rgb(0 0 0 / 0.4),
    0 0 50px rgb(0 0 0 / 0.45);
  /* -webkit-text-stroke: 1.5px black;
  text-shadow: 2px 2px 2px black; */
  -webkit-text-stroke: 1.5px rgb(0, 150, 180);
  /* text-shadow: 2px 2px 2px rgba(0, 150, 180, 0.95); */

  text-shadow: 0 0 5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.2),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.3);
`;

export const BJGifStyling = styled.img`
  min-width: 60vw;
  min-height: 30vh;
`;

/* Line 291: black background 
   Line 292: black background blur
   Line 293: black text outline
   Line 294: black text shadow
   Line 295: blue text outline
   Line 296: blue text shadow/3D effect.
*/

export const AlertParent = styled.div`
  /* background: radial-gradient(#444, #000); */
  background: rgb(0 0 0 / 0.85);
  width: 100%;
  height: 91vh;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const MoneyHeading = styled.h2`
  font-family: Helvetica, sans-serif;
  text-align: left;
  margin-left: 0px;
  margin-bottom: 0;
  padding-bottom: 0;
  padding-left: 12px;
  border-radius: 4px;
  line-height: 40px;
  vertical-align: center;
  color: #282013;
  clip-path: polygon(0% 0%, 90% 0%, 100% 100%, 0% 100%);
  height: 40px;
  width: 145px;
  background: linear-gradient(
    #9c6f0f 0,
    #bea11b 7%,
    #fce291 20%,
    #ffed98 40%,
    #ffd429 50%,
    #9c6f0f 62%,
    #bea11b 95%,
    #e0ba22 100%
  );
  border: 1px solid #9c6f0f;
`;

export const DollarDisplay = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  text-align: right;
  padding: 10px 10px 10px;
  padding-right: 10px;
  margin: 0px;
  color: white;
  box-sizing: content-box;
  background: linear-gradient(#4f3009 0, #110a04 100%);
  border: 2px ridge #ffc319;
  border-radius: 5px;
  box-shadow: 3px 3px 10px black;

  /* margin-top: 20px; */

  /* Gold filling, nice */
  /* background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #fdb931 8%,
      #9f7928 30%,
      #8a6e2f 40%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffff 0%,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 62.5%,
      #5d4a1f 100%
    ); */

  /* background: linear-gradient(
    to right bottom
    #ffed98,
    #9c6f0f,
    ) 1 100%; */
`;

export const Balance = styled.div`
  /* position: absolute; */
  /* right: 0px; */
  /* transform: translate(-50%, 0%); */
  /* left: 50%; */
  /* top: 0px; */
  /* margin: 0 auto; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 250px;
`;

export const CoinStyle = styled.img`
  width: 70px;
  height: 70px;
`;

export const ChipBalance = styled.div`
  width: 250px;
  height: 70px;
`;

export const CoinPosition = styled.div`
  position: absolute;
`;

export const Notification = styled.div`
  position: absolute;
  font-family: Helvetica, sans-serif;
  font-size: 1.4rem;
  color: white;
  line-height: 50%;
  text-align: center;
  background-color: red;
  border-radius: 100%;
  bottom: 160px;
  right: 120px;
  border: 22px solid rgb(240, 0, 0, 1);
  box-shadow: 2px 2px 7px black;
`;
export const TimerPositioning = styled.div`
  position: absolute;
  bottom: 150px;
  right: 30vw;
`;

export const ScorePositioning = styled.div`
  border: 7px solid black;
  background-color: black;
  color: white;
  border-radius: 50%;
  height: 2em;
  width: 2em;
  font-size: 1.5em;
  font-weight: 900;
  font-family: Helvetica, sans-serif;
  position: relative;
  left: 1.8em;
  top: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-color: ${(props) => (props.activeHand ? "orange" : "red")};
`;

export const BlackjackBackground = styled.div`
  background: linear-gradient(
    90deg,
    rgba(112, 115, 11, 0.6558998599439776) 0%,
    rgba(219, 201, 90, 0.6895133053221288) 47%,
    rgba(134, 130, 10, 0.44861694677871145) 81%
  );
  position: fixed;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 45%;
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 11;
`;
