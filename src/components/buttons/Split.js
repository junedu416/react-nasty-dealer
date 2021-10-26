import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import SplitIcon from '../../images/split.png';

const Split = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Split your hand into 2 seperate hands and draw 1 card into each of them."
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" color="warning" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Split <img src={SplitIcon} style={{width: "22px", height: "26px", marginLeft: "9px"}} alt="split cards" />
      </Button>
    </Tooltip>
  );
};

export default Split;
