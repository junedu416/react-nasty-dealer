import Button from "@mui/material/Button";
import DoubleIcon from "../../images/double.png";
import { Tooltip } from "@mui/material";


const Double = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Double your bet and draw one more card, but you're forced to stand after."
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
       <Button variant="contained" size="large" color="secondary" onClick={buttonFunc} style={{marginLeft: '10px'}}>
         Double <img src={DoubleIcon} style={{width: '25px', height: '25px', marginLeft:'10px'}} alt="double button" />
      </Button>
    </Tooltip>
  );
};

export default Double;
