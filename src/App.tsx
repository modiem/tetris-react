import { Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/Home';
import TetrisGame from './pages/TetrisPage';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/tetris" exact>
        <TetrisGame/>
      </Route>
      <Route path='*'>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
