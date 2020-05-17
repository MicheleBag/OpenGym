import React, { Component } from "react";
import SearchBar from "./searchBar";

class Home extends Component {
  render() {
    return (
      <div className="bg-primary">
        <SearchBar></SearchBar>
      </div>
    );
  }
}

export default Home;
