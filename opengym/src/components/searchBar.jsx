import React, { Component } from "react";

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
  render() {
    return (
      <React.Fragment>
        <div>
          <form style={this.formStyle}>
            <label style={this.textStyle} className="text-white">
              Cerca la tua palestra
            </label>
            <hr className="bg-white mt-1" />
            <input
              className="form-control form-control-lg mb-2 mr-sm-2"
              type="text"
              name="gymName"
              id="gymName"
              placeholder="Es. 'McFit Gym'"
            />
            <input
              className="btn btn-primary btn-lg mt-2 text-white border border-white"
              type="submit"
              value="Cerca"
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchBar;
