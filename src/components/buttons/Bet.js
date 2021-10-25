import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const Bet = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Toggle the chips display"
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" color="success" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Bet
      </Button>
    </Tooltip>
  );
};

export default Bet;
