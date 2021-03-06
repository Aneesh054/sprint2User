import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserUpsert } from "./components/UserUpsert";
import { UserList } from "./components/UserList";
import Switch from "react-bootstrap/esm/Switch";
import { AppNavBar } from "./common/AppNavBar";
function App() {
  return (
    <Router>
      <AppNavBar />
      <Switch>
        <Route path="/create-user">
          <UserUpsert />
        </Route>
        <Route path="/list-user">
          <UserList />
        </Route>
        <Route exact path="/">
          <UserList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
