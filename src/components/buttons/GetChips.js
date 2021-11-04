import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";


const GetChips = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Get some more chips"

  const centeredStyling = {
    position: 'absolute',
    top: '52%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '370px',
    height: '80px',
    fontSize: '1.5rem',
  }

  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button style={centeredStyling} variant="contained" size="large" color="warning" onClick={buttonFunc}>
        Get a small loan 
      </Button>
    </Tooltip>
  );
};

export default GetChips;