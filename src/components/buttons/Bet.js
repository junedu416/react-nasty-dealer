import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import BetIcon from "../../images/chips.png";

const Bet = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Toggle the chips display"
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" color="success" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Bet <img src={BetIcon} style={{width: "38px", height: "25px", marginLeft: "9px"}} alt="Bet button" />
      </Button>
    </Tooltip>
  );
};

export default Bet;
