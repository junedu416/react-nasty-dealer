import styled from "styled-components";

export const CenteredBox = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  height: ${(props) => (props.height ? props.height : "80vh")};
  max-width: 1400px;
  align-items: center;
  margin: 0 auto;
  border: 1px solid red;
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100%;
  width: 85%;
  align-items: center;
  border: 3px solid pink;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 98%;
  padding-left: 10px;
  padding-top: 15px;
  border: 3px solid green;
`;

// export const ButtonContainer = styled.div`
//   display: flex;
//   width: 100%;
//   border: 3px solid blue;
// `;
