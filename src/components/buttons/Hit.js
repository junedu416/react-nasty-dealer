import Button from "@mui/material/Button";
import HitIcon from "../../images/hit.png";

const Hit = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Hit <img src={HitIcon} alt="hit" style={{width: "25px", height: "25px", marginLeft: "4px"}} />  
    </Button>
  );
};

export default Hit;
