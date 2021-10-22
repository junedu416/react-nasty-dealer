import Button from "@mui/material/Button";

const Double = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="secondary" onClick={buttonFunc}>
      Double
    </Button>
  );
};

export default Double;
