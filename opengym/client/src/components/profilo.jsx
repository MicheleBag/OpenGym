import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import { edit } from "./userFunctions";

class Profilo extends Component {
  constructor(props) {
    const data = jsonwebtoken.decode(localStorage.usertoken);
    console.log(data);
    super(props);
    this.state = {
      editMode: false,
      name: data.nome,
      surname: data.cognome,
      email: data.email,
      newPassword: "",
      currentPassword: "",
      msg: "",
    };

    this.changeState = this.changeState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  textStyle = {
    fontSize: 20,
  };

  checkLogin() {
    if (localStorage.loginDone) {
      localStorage.removeItem("loginDone");
      window.location.reload();
    }
  }

  changeState(e) {
    this.setState({ editMode: !this.state.editMode });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      newPassword: this.state.newPassword,
      currentPassword: this.state.currentPassword,
    };

    edit(data).then((res) => {
      //DA FARE IL CONTROLLO SU COSA RISPONDE IL SERVER
      if (res) this.setState({ msg: "Modifiche effettuate" });
      //after 1sec this.setState({editMode: false});
      else this.setState({ msg: "Errore: Password errata" });
    });
  }

  render() {
    const dataCard = (
      <div className="card w-25 m-5">
        <h5 className="card-header">I tuoi dati</h5>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Email:</b> {this.state.email}
            </li>
            <li className="list-group-item">
              <b>Nome:</b> {this.state.name}
            </li>
            <li className="list-group-item">
              <b>Cognome:</b> {this.state.surname}
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={this.changeState}
          >
            Modifica i tuoi dati
          </button>
        </div>
      </div>
    );

    const editCard = (
      <div className="card w-25 m-5">
        <h5 className="card-header">Modifica i tuoi dati</h5>
        <div className="card-body">
          <form>
            <form
              style={this.formStyle}
              className="border border-white rounded p-3"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  required="required"
                  pattern="[A-Za-z ]{1,32}"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Cognome
                </label>
                <input
                  type="text"
                  className="form-control"
                  required="required"
                  pattern="[A-Za-z ]{1,32}"
                  name="surname"
                  value={this.state.surname}
                  placeholder="Es. Rossi"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Indirizzo email
                </label>
                <input
                  type="email"
                  className="form-control"
                  required="required"
                  name="email"
                  value={this.state.email}
                  placeholder="Inserisci la tua email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Nuova password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required="required"
                  //pattern=".{8,}"
                  name="newPassword"
                  value={this.state.newPassoword}
                  placeholder="Password nuova"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Password corrente
                </label>
                <input
                  type="password"
                  className="form-control"
                  required="required"
                  //pattern=".{8,}"
                  name="currentPassword"
                  value={this.state.currentPassword}
                  placeholder="Password corrente"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group form-inline">
                <button
                  onClick={this.changeState}
                  className="btn btn-link mr-3 col-sm-5"
                >
                  Annulla
                </button>
                <input
                  className="btn btn-warning btn-lg mt-2 px-1 col-sm-5 border border-dark"
                  type="submit"
                  value="Modifica"
                ></input>
              </div>
              <p className={"font-weight-bold mt-1 mb-0"}>{this.state.msg}</p>
            </form>
          </form>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        {this.checkLogin()}
        <h1 className="text-white">Bentornato in OpenGym!</h1>
        {this.state.editMode ? editCard : dataCard}
      </React.Fragment>
    );
  }
}

export default Profilo;
