import Button from "@mui/material/Button";

const Deal = (props) => {
  const {buttonFunc} = props;

  return (
    <Button variant="contained" size="large" onClick={buttonFunc}>
      Deal
    </Button>
  );
};

export default Deal;
