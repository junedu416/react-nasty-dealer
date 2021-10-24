import Button from "@mui/material/Button";

const ClearBet = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="error" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Clear Bet
    </Button>
  );
};

export default ClearBet;
