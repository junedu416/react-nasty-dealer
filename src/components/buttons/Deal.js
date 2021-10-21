import Button from "@mui/material/Button";

const Deal = (props) => {
  return (
    <Button variant="contained" size="large" onClick={() => props.handleClick}>
      Deal
    </Button>
  );
};

export default Deal;
