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
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to={"/Accedi"} className="nav-link">
                  Accedi
                </Link>
              </li>
              <li>
                <Link to={"/Registrati"} className="nav-link">
                  Registrati
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Accedi" component={Accedi} />
            <Route path="/Registrati" component={Registrati} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
