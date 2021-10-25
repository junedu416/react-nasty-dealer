import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const Hit = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Draw one more card"
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Hit
      </Button>
    </Tooltip>
  );
};

export default Hit;
