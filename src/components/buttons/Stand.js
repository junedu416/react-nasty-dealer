import Button from "@mui/material/Button";
import Hand from "../../images/hand.png";

const Stand = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="error" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Stand <img src={Hand} style={{width:'19px', height:'25px', marginLeft:'5px'}} alt='stand icon' />
    </Button>
  );
};

export default Stand;
