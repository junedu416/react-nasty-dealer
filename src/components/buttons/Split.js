import Button from "@mui/material/Button";

const Split = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="warning" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Split
    </Button>
  );
};

export default Split;
