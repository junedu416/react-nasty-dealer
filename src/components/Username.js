import TextField from '@mui/material/TextField';

function Username() {
  return (
    <TextField id="outlined-basic" label="Enter name" variant="outlined" onKeyPress={(event) => {
        if (event.key === 'Enter') console.log("WELCOME!!");
    }} />
  )
}

export default Username;
