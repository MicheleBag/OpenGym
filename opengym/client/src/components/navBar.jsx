import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./home";
import Registrati from "./registrati";
import Accedi from "./accedi";
import Risultati from "./risultati";
import Profilo from "./profilo";
import { checkState } from "./userFunctions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: checkState(),
    };
  }

  logOut(event) {
    if (localStorage.usertoken) {
      localStorage.removeItem("usertoken");
      this.setState({ loggedIn: false });
    }
  }

  render() {
    const guestLinks = (
      <ul className="navbar-nav ml-auto list-group-horizontal">
        <li className="mr-4 color">
          <Link
            to={"Accedi"}
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
    );

    const userLinks = (
      <ul className="navbar-nav ml-auto list-group-horizontal">
        <li className="mr-4 color">
          <Link
            to={"Profilo"}
            className="nav-link btn btn-primary text-white border-white"
          >
            Profilo
          </Link>
        </li>
        <li>
          <a
            href="/"
            onClick={this.logOut.bind(this)}
            className="nav-link text-white"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <Router>
        <React.Fragment>
          <nav className="navbar navbar-expand-lg bg-primary">
            <ul className="navbar-nav mr-auto mt-2">
              <li>
                <Link
                  to={"/"}
                  className="nav-link btn btn-warning text-black border-dark"
                >
                  <b>Home</b>
                </Link>
              </li>
            </ul>
            {this.state.loggedIn ? userLinks : guestLinks}
          </nav>
          <hr className="bg-white mt-2" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/accedi" component={Accedi} />
            <Route path="/registrati" component={Registrati} />
            <Route path="/risultati" component={Risultati} />
            <Route path="/profilo" component={Profilo} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default NavBar;
