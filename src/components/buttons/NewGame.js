import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";

const NewGame = (props) => {
  const {buttonFunc} = props;
  const tooltipText = "Clear the table and re-place your bet."
  return (
    <Tooltip title={tooltipText} enterDelay={1000}>
      <Button variant="contained" size="large" color="primary" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      New Game
      </Button>
    </Tooltip>

  );
};

export default NewGame;
