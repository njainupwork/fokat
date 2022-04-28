import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import GlobalStyle from "style/Global";
import history from "./routerHistory";
import Home from "pages/home";
import "./App.css";
import useEagerConnect from "hooks/useEagerConnect";

function App() {
  useEagerConnect();
  return (
    <Router history={history}>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Router>
  );
}

export default App
