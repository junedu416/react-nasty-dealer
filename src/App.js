import CardTest from "./components/CardTest";
import Home from "./components/Home";
import { Link, Switch, Route } from "react-router-dom";
import { Lobby } from "./components/buttons/Lobby";
import RulePage from "./components/rule/RulePage";
import Player from './components/MusicPlayer'
import { AppBodyContainer } from './components/styled-components';

function App() {
  const navStyling = {
    width: '100%',
    maxWidth: '1920px',
    height: '60px',
    display: 'flex',
    backgroundColor: 'black',
    margin: '0',
    padding: '0',
    flexDirection: 'row',
    alignItems: 'center',

  }

  return (
    <>
      <nav style={navStyling}>
        <Link to="/">
          <Lobby />
        </Link>
        <RulePage />
        <Player/>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/blackjack">
          <CardTest />
        </Route>
      </Switch>
    </>
  );
}

export default App;
