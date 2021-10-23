import CardTest from "./components/CardTest";
import Home from "./components/Home";
import BlackJackRule from "./components/BlackJackRule";
import { Link, Switch, Route } from "react-router-dom";
import Timer from "./components/Timer";
import { Lobby } from "./components/buttons/Lobby";
import RulePage from "./components/rule/RulePage";

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
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/blackjack">
          <CardTest />
        </Route>
        {/* there's no link for backjack rule page yet. Can put it on game page after game page set */}
        <Route path="/blackjack/rule">
          <BlackJackRule />
        </Route>
        {/* set this route temporarily to test Timer function */}
        <Route path="/timer">
          <Timer />
        </Route>
      </Switch>
    </>
  );
}

export default App;
