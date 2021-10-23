import Button from "@mui/material/Button";

const Split = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="warning" onClick={buttonFunc}>
      Split
    </Button>
  );
};

export default Split;
