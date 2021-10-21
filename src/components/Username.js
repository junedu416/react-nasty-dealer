import TextField from "@mui/material/TextField";

function Username() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Enter name"
      variant="outlined"
      onKeyPress={(event) => {
        if (event.key === "Enter") console.log("WELCOME!!");
      }}
      onChange={handleChange}
    />
  );
}

export default Username;
