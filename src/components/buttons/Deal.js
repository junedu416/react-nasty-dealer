import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const Deal = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Deal a new hand (2 cards each)"

  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" onClick={buttonFunc} style={{marginLeft: '50px'}}>
        Deal
      </Button>
    </Tooltip>
  );
};

export default Deal;
