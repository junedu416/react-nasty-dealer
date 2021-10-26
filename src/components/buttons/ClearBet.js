import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import ClearIcon from "../../images/clear.png";

const ClearBet = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Clear your current bet."
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" color="error" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Clear Bets 
      {/* <img src={ClearIcon} style={{width: "20px", height: "20px", marginLeft: "4px"}} alt="Clear Bets" /> */}
      </Button>
    </Tooltip>
  );
};

export default ClearBet;
