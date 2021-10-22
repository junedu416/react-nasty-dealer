import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CenteredBox } from './styled-components';
import Background from '../images/hero.png'
import { autocompleteClasses } from "@mui/material";

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

  const homePage = {
    background: `url(${Background}) no-repeat center center`,
    backgroundSize: 'cover',
    maxWidth: '1400px',
    margin: '0 auto',
  }

  const textStyle = {
    backgroundColor: 'rgb(230, 230, 230, 0.87)',
    padding: '10px',
    borderRadius: '5px',
  }

  const welcome = {
    backgroundColor: 'rgb(0, 0, 0, 0.6)',
    padding: '20px',
    borderRadius: '4px',
    color: 'white',
    fontFamily: 'helvetica',
    fontSize: '3.6rem',
  }

  return (
    <div style={homePage}>
      <CenteredBox>
          {login ? (
            <h1 style={welcome}>
              Hi
              {username
                ? ` ${username}! Welcome to the Nasty Dealer`
                : " idiot, you forget to input your name, but still welcome!"}
            </h1>
          ) : (
            <form onSubmit={handleSubmit} style={textStyle}>
              <TextField
                id="outlined-basic"
                label="Enter name"
                variant="outlined"
                value={username}
                onChange={handleChange}
                style={{width:'0px', paddingRight:'8px'}}
              />
              <Button type="submit" variant="contained" size="large" style={{height: '55px'}}>
                Submit
              </Button>
            </form>
          )}
      </CenteredBox>
    </div>
  );
}

export default Home;
