import React from "react";
import Pokedex from "./Pokedex";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
  </Switch>
);

export default App;