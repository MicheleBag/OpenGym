import React, { Component } from "react";
import { Redirect } from "react-router";
import { Spring, animated, Transition } from "react-spring/renderprops";
import AnimatedText from "./animatedText";

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
      gymName: "",
      submitted: false, //used to redirect when submitting
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ submitted: true });
  }

  render() {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ duration: 800 }}
      >
        {(props) => (
          <React.Fragment>
            <animated.div style={props}>
              <form style={this.formStyle} onSubmit={this.handleSubmit}>
                <label style={this.textStyle} className="text-white">
                  <AnimatedText text="Cerca la tua palestra" point="!" />
                </label>
                <hr className="bg-white mt-1" />
                <input
                  className="form-control form-control-lg mb-2 mr-sm-2"
                  type="text"
                  name="gymName"
                  id="gymName"
                  value={this.state.value}
                  placeholder="Es. McFit Gym"
                  onChange={this.handleChange}
                />
                <input
                  className="btn btn-primary btn-lg mt-2 text-white border border-white"
                  type="submit"
                  value="Cerca"
                />
              </form>
              {this.state.submitted && (
                <Redirect to={"/Risultati/" + this.state.gymName} />
              )}
            </animated.div>
          </React.Fragment>
        )}
      </Spring>
    );
  }
}

export default SearchBar;
