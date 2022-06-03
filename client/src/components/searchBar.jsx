import React, { Component } from "react";
import { Redirect } from "react-router";
import AnimatedText from "./animatedText";
import { Spring, animated } from "react-spring/renderprops";
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
      <React.Fragment>
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
            required="required"
            value={this.state.value}
            placeholder="Es. McFit Gym"
            onChange={this.handleChange}
          />
          <Spring
            from={{
              opacity: 0,
              transform: "rotateY(90deg)",
            }}
            to={{ opacity: 1, transform: "rotateY(0deg)" }}
            config={{ delay: 500, duration: 400 }}
          >
            {(props) => (
              <animated.div style={props}>
                <input
                  className="btn btn-primary btn-lg mt-2 text-white border border-white"
                  type="submit"
                  value="Cerca"
                />
              </animated.div>
            )}
          </Spring>
        </form>
        {this.state.submitted && (
          <Redirect to={"/Risultati/" + this.state.gymName} />
        )}
      </React.Fragment>
    );
  }
}

export default SearchBar;
