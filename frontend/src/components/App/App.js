import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "../SignUp/SignUp";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import SignInSide from "../Login/Login";

const hist = createBrowserHistory();

function App(props) {
  const isLogged = useSelector(state => state.isLogged);

  return (
    <div>
      <Router history={hist}>
        <Switch>
          <Route exact path="/" component={SignInSide} />
          <Route exact path="/signUp" component={SignUp} />
          <Route path="/admin">{isLogged ? <Admin /> : <SignInSide />}</Route>
          <Route path="/rtl">
            {isLogged ? <RTL /> : <SignInSide />}
            <RTL />
          </Route>
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
