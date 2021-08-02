import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "../SignUp/SignUp";
import axios from "axios";
import Cookies from "js-cookie";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import SignInSide from "../Login/Login";

const hist = createBrowserHistory();

//* The axios interceptors attach for each http request the access token.
//* If the user need new access token, it handles it.

axios.interceptors.response.use(
  response => {
    return response;
  },
  async function(error) {
    const refreshToken = Cookies.get("refreshToken");
    const errorRequest = error.response;
    if (errorRequest.status !== 303) {
      return error;
    }
    const originalRequest = error.config;
    try {
      const { accessToken } = await getNewToken(refreshToken);
      Cookies.set("token", `${accessToken}`, { expires: 1 });
      const originalResponse = await axios(originalRequest);
      return originalResponse;
    } catch (error) {
      console.log(error);
    }
  }
);
axios.interceptors.request.use(async function(config) {
  const token = await Cookies.get("token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

async function getNewToken(refToken) {
  try {
    const token = await axios.post(
      "http://app.smartlibrary.link:8080/user/refreshToken",
      {
        refToken: refToken,
      }
    );
    return token.data;
  } catch (error) {
    console.log(error);
  }
}
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
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;