import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Home() {
  const [username, setUsername] = useState(retrieveUser());
  const [login, setLogin] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLogin(true);
  }

  function handleChange(event) {
    setUsername(event.target.value);
    localStorage.setItem("username", event.target.value)
  }

  function retrieveUser() {
    const user = localStorage.getItem("username");
    return user || "";
  }

  return (
    <div>
      {login ? (
        <h1>
          Hi
          {username
            ? ` ${username}! Welcome to the game`
            : " idiot, you forget to input your name, but still welcome!"}
        </h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Enter name"
            variant="outlined"
            value={username}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" size="large">
            Start Game
          </Button>
        </form>
      )}
    </div>
  );
}

export default Home;
