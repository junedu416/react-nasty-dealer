import Button from "@mui/material/Button";

const Deal = (props) => {
  const {buttonFunc} = props;

  return (
    <Button variant="contained" size="large" onClick={buttonFunc} style={{marginLeft: '50px'}}>
      Deal
    </Button>
  );
};

export default Deal;
