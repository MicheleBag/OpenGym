import React, { Component } from "react";

class SearchBar extends Component {
  formStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  textStyle = {
    fontSize: 52,
  };
  render() {
    return (
      <React.Fragment>
        <div className="bg-primary">
          <form style={this.formStyle} className="bg-primary">
            <label style={this.textStyle} className="text-white">
              Cerca la tua palestra
            </label>
            <input
              className="form-control mb-2 mr-sm-2"
              type="text"
              name="gymName"
              defaultValue="Es. 'McFit Gym'"
            />
            <input
              className="btn btn-primary mt-2 text-white border border-white"
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
