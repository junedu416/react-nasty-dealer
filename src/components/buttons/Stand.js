import Button from "@mui/material/Button";

const Stand = (props) => {
  const {buttonFunc} = props;
  return (
    <Button variant="contained" size="large" color="error" onClick={buttonFunc} style={{marginLeft: '10px'}}>
      Stand
    </Button>
  );
};

export default Stand;
