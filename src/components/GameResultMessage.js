import React from "react";
import {
  GoldText,
  MessageAlert,
  BJGifStyling,
} from "./styled-components/index";
import Backdrop from "@mui/material/Backdrop";
import BJGif from "../images/gif.jpg";

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
          <BJGifStyling src={BJGif} alt="sparkles blackjack win" />
        </Backdrop>
      ) : (
        <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}  onClick={handleClose}>
          <MessageAlert>
            {resultMessage.result}
          </MessageAlert>
        </Backdrop>
      )}
    </>
  );
};

export default GameResultMessage;
