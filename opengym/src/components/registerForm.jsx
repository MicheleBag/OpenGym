import React, { Component } from "react";
import { Redirect } from "react-router";

class RegisterForm extends Component {
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
        name: {
          value: "",
          placeholder: "Es. Mario",
        },
        surname: {
          value: "",
          placeholder: "Es. Rossi",
        },
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
          <div class="form-group form-inline">
            <label style={this.textStyle} className="text-white mr-auto">
              Nome
            </label>
            <input
              type="text"
              class="form-control"
              required="required"
              pattern="[A-Za-z ]{1,32}"
              name="name"
              value={this.state.formData.name.value}
              placeholder={this.state.formData.name.placeholder}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group form-inline">
            <label style={this.textStyle} className="text-white mr-5">
              Cognome
            </label>
            <input
              type="text"
              class="form-control"
              required="required"
              pattern="[A-Za-z ]{1,32}"
              name="surname"
              value={this.state.formData.surname.value}
              placeholder={this.state.formData.surname.placeholder}
              onChange={this.handleChange}
            />
          </div>
          <div class="form-group">
            <label style={this.textStyle} className="text-white">
              Indirizzo Email
            </label>
            <input
              type="email"
              class="form-control"
              required="required"
              name="email"
              value={this.state.formData.email.value}
              placeholder={this.state.formData.email.placeholder}
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
              required="required"
              //pattern=".{8,}"
              name="password"
              value={this.state.formData.password.value}
              placeholder={this.state.formData.password.placeholder}
              onChange={this.handleChange}
            />
          </div>
          <input
            className="btn btn-warning btn-lg mt-2  border border-dark"
            type="submit"
            value="Registrati"
          />
        </form>

        {this.state.submitted && <Redirect to={"/Accedi"} />}
      </React.Fragment>
    );
  }
}

export default RegisterForm;
