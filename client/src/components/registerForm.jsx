import React, { Component } from "react";
import { register } from "./userFunctions";

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
      name: "",
      surname: "",
      email: "",
      password: "",
      submitted: false, //used to redirect when submitting
      msg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
    };

    register(newUser).then((res) => {
      if (res) this.setState({ msg: "Registrazione effettuata" });
      else this.setState({ msg: "Ops! Qualcosa è andato storto" });
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
              value={this.state.name}
              placeholder="Es. Mario"
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
              value={this.state.surname}
              placeholder="Es. Rossi"
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
              value={this.state.email}
              placeholder="Inserisci la tua email"
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
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <input
            className="btn btn-warning btn-lg mt-2  border border-dark"
            type="submit"
            value="Registrati"
          />
          <p className={" text-white font-weight-bold mt-1 mb-0"}>
            {this.state.msg}
          </p>
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
