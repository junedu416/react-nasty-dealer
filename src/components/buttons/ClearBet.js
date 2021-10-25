import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const ClearBet = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Clear your current bet."
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" color="error" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Clear Bet
      </Button>
    </Tooltip>
  );
};

export default ClearBet;
