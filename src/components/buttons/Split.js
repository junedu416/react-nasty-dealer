import Button from "@mui/material/Button";
// import { createTheme } from "@mui/material/styles";
// import { yellow } from "@mui/material/colors";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: yellow[500],
//     },
//     secondary: {
//       main: "#f44336",
//     },
//   },
// });

const Split = (props) => {
  return (
    <Button variant="contained" size="large" color="warning" onClick={() => props.handleClick}>
      Split
    </Button>
  );
};

export default Split;
