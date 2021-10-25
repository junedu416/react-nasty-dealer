import Button from "@mui/material/Button";
import DoubleIcon from "../../images/double.png";

const Double = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="secondary" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Double <img src={DoubleIcon} style={{width: '30px', marginLeft:'10px'}} alt="double button" />
    </Button>
  );
};

export default Double;
