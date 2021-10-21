import CardTest from "./components/CardTest";

import Home from './components/Home';
import BlackJackRule from './components/BlackJackRule';
import {Link, Switch, Route} from 'react-router-dom';
import Timer from './components/Timer'

function App() {

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Lobby</Link>
          </li>
          <li>
            <Link to="/blackjack">Angry Blackjack</Link>
          </li>
        </ul>
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
          <Timer/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
