import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CenteredBox } from './styled-components';
import Background from '../images/hero.png'
// import { autocompleteClasses } from "@mui/material";
import { Link } from "react-router-dom";
import { StartGame } from "./buttons/StartGame";

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
    maxWidth: '1960px',
    margin: '0 auto',
  }

  const textStyle = {
    backgroundColor: 'rgb(230, 230, 230, 0.87)',
    padding: '10px',
    borderRadius: '5px',
  }

  const welcome = {
    backgroundColor: 'rgb(0, 0, 0, 0.64)',
    padding: '20px 60px',
    borderRadius: '5px',
    color: 'white',
    fontFamily: 'helvetica',
    fontSize: '3.6rem',
    whiteSpace: 'pre',
    textAlign: 'center',
    lineHeight: '2',
    border: '5px solid #D4Af37',
  }

  const loggedIn = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  }

  return (
    <div style={homePage}>
      <CenteredBox style={{maxWidth: '1960px'}}>
          {login ? (
            <>
              <div style={loggedIn}>
                <h1 style={welcome}>
                  Hi
                  {username
                    ? ` ${username}! \nWelcome to the Nasty Dealer`
                    : " idiot! \nYou forget to input your name, but you're still welcome!"}
                </h1>
                <Link to="/blackjack" style={{textDecoration: 'none'}}>
                  <StartGame />
                </Link>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} style={textStyle}>
              <TextField
                id="outlined-basic"
                label="Enter name"
                variant="outlined"
                value={username}
                onChange={handleChange}
                style={{width:'280px', paddingRight:'8px'}}
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
