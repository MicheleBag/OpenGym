import React, { Component } from "react";

class Risultati extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
    };
  }
  //DEVO CONTROLLARE SE LA CHIAVE NON è VUOTA ED IN CASO FARE UNA POST AL SERVER PER LA LISTA
  async componentDidMount() {
    if (this.props.match.params) {
      try {
        const gymName = this.props.match.params.gymName;
        this.setState({ key: gymName });
      } catch (err) {
        this.setState({ key: "" });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Lista risultati</h1>
        <p>{this.state.key}</p>
      </React.Fragment>
    );
  }
}

export default Risultati;
