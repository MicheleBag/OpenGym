import React, { Component } from "react";
import { Redirect } from "react-router";
import { login } from "./userFunctions";
class LoginForm extends Component {
  formStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  textStyle = {
    fontSize: 30,
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false, //used to redirect when submitting
      email: "",
      password: "",
      redirectPath: "./profilo",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    login(user).then((res) => {
      if (res) {
        console.log(res);
        //this.props.history.push(`/`);
        if (res === "autenticato") this.setState({ submitted: true });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <form
          style={this.formStyle}
          className="border border-white rounded p-4"
          onSubmit={this.handleSubmit}
        >
          <div class="form-group">
            <label style={this.textStyle} className="text-white">
              Indirizzo Email
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              required="required"
              placeholder="Inserisci la tua email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label style={this.textStyle} className="text-white">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              name="password"
              required="required"
              //pattern=".{8,}"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input
            className="btn btn-warning btn-lg mt-2  border border-dark"
            type="submit"
            value="Accedi"
          />
        </form>

        {this.state.submitted && <Redirect to={this.state.redirectPath} />}
      </React.Fragment>
    );
  }
}

export default LoginForm;
