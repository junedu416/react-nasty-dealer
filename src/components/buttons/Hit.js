import Button from "@mui/material/Button";



const Hit = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" onClick={buttonFunc}>
      Hit
    </Button>
  );
};

export default Hit;
