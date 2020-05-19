import React from "react";
import "./App.css";
import Home from "./components/home";
import Registrati from "./components/registrati";
import Accedi from "./components/accedi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Risultati from "./components/risultati";
function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <nav className="navbar navbar-expand-lg bg-primary">
            <ul className="navbar-nav mr-auto mt-2">
              <li>
                <Link
                  to={"/"}
                  className="nav-link btn btn-warning text-black border-dark"
                >
                  {" "}
                  <b>Home</b>{" "}
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto list-group-horizontal">
              <li className="mr-4 color">
                <Link
                  to={"/Accedi"}
                  className="nav-link btn btn-primary text-white border-white"
                >
                  Accedi
                </Link>
              </li>
              <li>
                <Link
                  to={"/Registrati"}
                  className="nav-link btn btn-primary text-white border-white"
                >
                  Registrati
                </Link>
              </li>
            </ul>
          </nav>
          <hr className="bg-white mt-2" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/accedi" component={Accedi} />
            <Route path="/registrati" component={Registrati} />
            <Route path="/risultati" component={Risultati} />
          </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
