import React from "react";
import "./App.css";
import NavBar from "./components/navBar";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <NavBar />
        </React.Fragment>
      </div>
    );
  }
}

export default App;
