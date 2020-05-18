import React, { Component } from "react";
import { Redirect } from "react-router";

class SearchBar extends Component {
  formStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  textStyle = {
    fontSize: 60,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      placeholder: "Es. McFit Gym",
      submitted: false, //used to redirect when submitting
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ submitted: true });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <form style={this.formStyle} onSubmit={this.handleSubmit}>
            <label style={this.textStyle} className="text-white">
              Cerca la tua palestra
            </label>
            <hr className="bg-white mt-1" />
            <input
              className="form-control form-control-lg mb-2 mr-sm-2"
              type="text"
              name="gymName"
              id="gymName"
              value={this.state.value}
              placeholder={this.state.placeholder}
              onChange={this.handleChange}
            />
            <input
              className="btn btn-primary btn-lg mt-2 text-white border border-white"
              type="submit"
              value="Cerca"
            />
          </form>
          {this.state.submitted && <Redirect to={"/Risultati"} />}
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar;
