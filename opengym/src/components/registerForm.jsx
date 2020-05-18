import React, { Component } from "react";

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
  render() {
    return (
      <React.Fragment>
        <form
          style={this.formStyle}
          className="border border-white rounded p-4"
        >
          <div class="form-group form-inline">
            <label style={this.textStyle} className="text-white mr-auto">
              Nome
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Es. Mario"
            />
          </div>
          <div class="form-group form-inline">
            <label style={this.textStyle} className="text-white mr-5">
              Cognome
            </label>
            <input
              type="text"
              class="form-control"
              id="surname"
              placeholder="Es. Rossi"
            />
          </div>
          <div class="form-group">
            <label style={this.textStyle} className="text-white">
              Indirizzo Email
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Inserisci la tua email"
            />
          </div>
          <div class="form-group">
            <label style={this.textStyle} className="text-white">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <input
            className="btn btn-warning btn-lg mt-2  border border-dark"
            type="submit"
            value="Registrati"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
