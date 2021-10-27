import React from "react";
import {
  GoldText,
  MessageAlert,
} from "./styled-components/index";
import Backdrop from "@mui/material/Backdrop";

const GameResultMessage = ({ resultMessage }) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {resultMessage.result === "BLACKJACK" ? (
        <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}  onClick={handleClose}>
          <GoldText> BLACKJACK </GoldText>
        </Backdrop>
      ) : (
        <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}  onClick={handleClose}><MessageAlert>{resultMessage.result}</MessageAlert></Backdrop>
      )}
    </>
  );
};

export default GameResultMessage;
