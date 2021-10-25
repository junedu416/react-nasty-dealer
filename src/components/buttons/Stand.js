import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const Stand = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Stay with your current score and pass the turn over to the Dealer"
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" color="error" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Stand
      </Button>
    </Tooltip>
  );
};

export default Stand;
