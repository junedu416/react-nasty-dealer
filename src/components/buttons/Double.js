import Button from "@mui/material/Button";

const Double = (props) => {
  return (
    <Button variant="contained" size="large" color="secondary" onClick={() => props.handleClick}>
      Double
    </Button>
  );
};

export default Double;
