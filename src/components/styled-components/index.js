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
  width: 21%;
  height: 90vh;
  bottom: 0px;
  right: -8px;
  padding: 10px;
  opacity: 1;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #cfefef;
  border-radius: 10px;
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

  &:hover {
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
  }
`;

export const HideChat = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
  background: rgb(0, 0, 0, 0.4);
  /* background: red; */
  padding: 10px;
  border-radius: 8px;

`

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
`;

export const MoneyBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: center; */
  width: 200px;
  position: absolute;
  top: 70px;
  left: 0px;
  padding-left: 30px;
  background-color: rgb(100, 200, 255, 0.4);
`;

export const MessagingIcon = styled.img`
   width: 150px;
   height: 150px;
   position: absolute;
   bottom: 60px;
   right: 20px;
`;

export const MessageAlert = styled.h1`
  font-size: 6rem;
  color: ${props => props.color ? props.color : 'white'};
  position: absolute;
  top: 38%;
  /* left: 36%; */
  margin: 0 auto;
  /* transform: translate(-50%, -50%); */
  background-color: rgb(0, 0, 0, 0.7);
  /* box-shadow: 0 1px 30px rgb(0 0 0 / 0.6); */
  font-family: helvetica;
  padding: 30px;
  border-radius: 20px;
`

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
`