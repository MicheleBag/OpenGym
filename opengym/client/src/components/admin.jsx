import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import { Spring, animated, config } from "react-spring/renderprops";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: "",
      address: "",
      city: "",
      image: "",
      capacity: "",
      opening: "",
      closing: "",
      msg: "",
      reservationList: "",
      dataReady: false,
    };

    this.changeState = this.changeState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    try {
      //get gym data
      const gymData = jsonwebtoken.decode(localStorage.admintoken);
      this.setState({ name: gymData.x });
      this.setState({ address: gymData.x });
      this.setState({ city: gymData.x });
      this.setState({ image: gymData.x });
      this.setState({ capacity: gymData.x });
      this.setState({ opening: gymData.x });
      this.setState({ closing: gymData.x });

      //get daily reservations
      //api call
    } catch (err) {
      console.log(err);
    }
  }

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

  render() {
    const dataCard = (
      <div className="card m-4">
        <h5 className="card-header">Dati palestra</h5>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Nome:</b> {this.state.name}
            </li>
            <li className="list-group-item">
              <b>Città:</b> {this.state.city}
            </li>
            <li className="list-group-item">
              <b>Indirizzo:</b> {this.state.address}
            </li>
            <li className="list-group-item">
              <b>Immagine:</b> {this.state.image}
            </li>
            <li className="list-group-item">
              <b>Capacità:</b> {this.state.capacity}
            </li>
            <li className="list-group-item">
              <b>Apertura:</b> {this.state.opening}
            </li>
            <li className="list-group-item">
              <b>Chiusura:</b> {this.state.closing}
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={this.changeState}
          >
            Modifica i dati
          </button>
        </div>
      </div>
    );

    const editCard = (
      <div className="card m-4">
        <h5 className="card-header">Modifica i dati</h5>
        <div className="card-body p-2">
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
                  Città
                </label>
                <input
                  type="text"
                  className="form-control"
                  required="required"
                  pattern="[A-Za-z ]{1,32}"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Indirizzo
                </label>
                <input
                  className="form-control"
                  required="required"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Immagine
                </label>
                <input
                  type="file"
                  className="form-control"
                  required="required"
                  name="image"
                  value={this.state.image}
                  placeholder="Carica una foto"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Capacità
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  className="form-control"
                  required="required"
                  name="capacity"
                  value={this.state.capacity}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Apertura
                </label>
                <input
                  type="time"
                  className="form-control"
                  required="required"
                  name="opening"
                  value={this.state.opening}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label style={this.textStyle} className="">
                  Chiusura
                </label>
                <input
                  type="time"
                  className="form-control"
                  required="required"
                  name="closing"
                  value={this.state.closing}
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
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={config.molasses}
      >
        {(props) => (
          <React.Fragment>
            {this.checkLogin()}
            <animated.div style={props}>
              <h1>Pannello di controllo</h1>
              {this.state.editMode ? editCard : dataCard}
            </animated.div>
          </React.Fragment>
        )}
      </Spring>
    );
  }
}

export default Admin;
