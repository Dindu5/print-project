import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth";
import CreateOrder from "./pages/CreateOrder";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create-order">
          <CreateOrder />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
