import Button from "@mui/material/Button";

const Bet = (props) => {
  return (
    <Button variant="contained" size="large" color="success" onClick={() => props.handleClick}>
      Bet
    </Button>
  );
};

export default Bet;
