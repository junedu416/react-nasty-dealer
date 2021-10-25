import CardTest from "./components/CardTest";
import Home from "./components/Home";
import { Link, Switch, Route } from "react-router-dom";
import { Lobby } from "./components/buttons/Lobby";
import RulePage from "./components/rule/RulePage";
import Player from './components/MusicPlayer'
// import { AlertParent, MessageAlert, CenteredBox } from './components/styled-components';

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
    paddingRight: '20px',
  }

  const buttons = {
    display: 'flex',
    width: '93vw',
    height: '60px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '50px',
    // border: '4px solid yellow',
  }

  return (
    <>
    {/* ============= JUNE ============ TAKE THIS CODE, and move to CardTest. */}
      {/* <AlertParent>
        <CenteredBox>
          <MessageAlert>
            BLACKJACK!
          </MessageAlert>
        </CenteredBox>
      </AlertParent> */}
      <nav style={navStyling}>
        <div>
          <Link to="/">
            <Lobby />
          </Link>
        </div>
        <div style={buttons}>
          <RulePage />
          <Player/>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/nastydealer">
          <CardTest />
        </Route>
      </Switch>
    </>
  );
}

export default App;
