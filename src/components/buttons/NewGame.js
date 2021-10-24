import Button from "@mui/material/Button";

const NewGame = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="primary" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      New Game
    </Button>
  );
};

export default NewGame;
