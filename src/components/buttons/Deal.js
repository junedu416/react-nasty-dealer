import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import DealIcon from "../../images/deal.png"

const Deal = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Deal a new hand (2 cards each)"

  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" onClick={buttonFunc} style={{marginLeft: '50px'}}>
        Deal <img src={DealIcon} style={{width: "25px", height: "25px", marginLeft: "4px"}} alt="Deal cards" />
      </Button>
    </Tooltip>
  );
};

export default Deal;
