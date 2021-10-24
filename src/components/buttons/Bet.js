import Button from "@mui/material/Button";

const Bet = (props) => {
  const {buttonFunc} = props;

  return (
    <Button variant="contained" size="large" color="success" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Bet
    </Button>
  );
};

export default Bet;
