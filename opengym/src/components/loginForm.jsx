import React, { Component } from "react";
import { Redirect } from "react-router";

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
      formData: {
        email: {
          value: "",
          placeholder: "Inserisci la tua email",
        },
        password: {
          value: "",
          placeholder: "Password",
        },
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //Handle different input field using different names
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: {
          ...this.state.formData[name],
          value,
        },
      },
    });
  }

  handleSubmit(event) {
    this.setState({ submitted: true });
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
              placeholder={this.state.formData.email.placeholder}
              value={this.state.formData.email.value}
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
              placeholder={this.state.formData.password.placeholder}
              value={this.state.formData.password.value}
              onChange={this.handleChange}
            />
          </div>
          <input
            className="btn btn-warning btn-lg mt-2  border border-dark"
            type="submit"
            value="Accedi"
          />
        </form>

        {this.state.submitted && <Redirect to={"./"} />}
      </React.Fragment>
    );
  }
}

export default LoginForm;
