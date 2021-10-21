import Button from "@mui/material/Button";

const Hit = (props) => {
  return (
    <Button variant="contained" size="large" onClick={() => props.handleClick}>
      Hit
    </Button>
  );
};

export default Hit;
