import React, { Component } from "react";

class Profilo extends Component {
  checkLogin() {
    if (localStorage.loginDone) {
      localStorage.removeItem("loginDone");
      window.location.reload();
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.checkLogin()}
        <h1>Profilo</h1>
      </React.Fragment>
    );
  }
}

export default Profilo;
