import React from "react";
import "./App.css";
import Home from "./components/home";
import Registrati from "./components/registrati";
import Accedi from "./components/accedi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
                  className="nav-link text-white border border-white rounded"
                >
                  {" "}
                  Home{" "}
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto list-group-horizontal">
              <li className="mr-4 color">
                <Link
                  to={"/Accedi"}
                  className="nav-link text-white border border-white rounded"
                >
                  Accedi
                </Link>
              </li>
              <li>
                <Link
                  to={"/Registrati"}
                  className="nav-link text-white border border-white rounded"
                >
                  Registrati
                </Link>
              </li>
            </ul>
          </nav>
          <hr className="bg-white mt-2" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Accedi" component={Accedi} />
            <Route path="/Registrati" component={Registrati} />
          </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
