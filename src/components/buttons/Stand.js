import Button from "@mui/material/Button";

const Stand = (props) => {
  return (
    <Button variant="contained" size="large" color="error" onClick={() => props.handleClick}>
      Stand
    </Button>
  );
};

export default Stand;
