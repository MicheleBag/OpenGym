import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import { Spring, animated, config } from "react-spring/renderprops";
import { editGym, getAdminReservation } from "./userFunctions";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      id: "",
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      //get gym data
      const gymData = jsonwebtoken.decode(localStorage.admintoken);
      //console.log(gymData);
      this.setState({ id: gymData.id_palestra });
      this.setState({ name: gymData.name });
      this.setState({ address: gymData.address });
      this.setState({ city: gymData.city });
      this.setState({ image: gymData.immagine });
      this.setState({ capacity: gymData.capacity });
      this.setState({ opening: gymData.open_time });
      this.setState({ closing: gymData.closed_time });

      //get daily reservations
      getAdminReservation(gymData.id_palestra)
        .then((res) => {
          console.log("ciao");
          //this.setState({ reservationList: res });
          //this.setState({ dataReady: true });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
    if (event.target.name === "image") {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    console.log(this.state.image);
    var formData = new FormData();
    formData.append("file", this.state.image);
    console.log(formData.getAll("file"));

    event.preventDefault();
    const data = {
      id_palestra: this.state.id,
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      immagine: formData.getAll("file"),
      capacity: this.state.capacity,
      open_time: this.state.opening,
      closed_time: this.state.closing,
    };

    editGym(data).then((res) => {
      //DA FARE IL CONTROLLO SU COSA RISPONDE IL SERVER
      if (res) this.setState({ msg: "Modifiche effettuate" });
      //after 1sec this.setState({editMode: false});
      else this.setState({ msg: "Errore: Password errata" });
    });
  }

  //made to use reservation list in a more usable data struct
  fetchData = () => {
    var data = [];
    const nReservation = this.state.reservationList.length;
    for (let k = 0; k < nReservation; k++) {
      data.push(this.state.reservationList[k]);
    }
    return data;
  };

  render() {
    const dataCard = (
      <div className="card m-4">
        <h5 className="card-header">Dati palestra</h5>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <img
                className="card-img-top p-2"
                src={
                  "data:image/png;base64," +
                  btoa(String.fromCharCode.apply(null, this.state.image.data))
                }
                alt="gym pic"
              />
            </li>
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

    const listItem = () => {
      var item = [];
      var data = this.fetchData();
      const nReservation = Object.keys(data).length;
      const tdClass = "align-middle py-1";
      item.push(
        <tr className="">
          <th>#</th>
          <th>Orario</th>
          <th>Nome</th>
          <th>Cognome</th>
        </tr>
      );
      for (let k = 0; k < nReservation; k++) {
        //console.log(data[k]);
        item.push(
          <tr>
            <td className={tdClass}>
              <b>{k + 1}</b>
            </td>
            <td className={tdClass}>
              {data[k].orario_inizio}-{data[k].orario_fine}{" "}
            </td>
            <td className={tdClass}>{data[k].nome}</td>
            <td className={tdClass}>{data[k].cognome}</td>
          </tr>
        );
      }
      return item;
    };

    const list = (
      <div className="card m-4">
        <h5 className="card-header">Le tue prenotazioni</h5>
        <div className="card-body">
          <table className="table table-bordered">{listItem()}</table>
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
            <animated.div style={props}>
              <h1>Prenotazioni giornaliere</h1>
              {list}
            </animated.div>
          </React.Fragment>
        )}
      </Spring>
    );
  }
}

export default Admin;
