import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../modules/HomeScreen";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
