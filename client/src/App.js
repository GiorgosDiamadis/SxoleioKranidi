import React, { useContext } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeflex/primeflex.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
            <Home/>
        </Route>
        <Route exact path="/7e53c9eaf1952647/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
