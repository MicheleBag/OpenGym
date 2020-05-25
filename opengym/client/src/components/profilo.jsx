import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import { edit } from "./userFunctions";
import AnimatedText from "./animatedText";
import { Spring, animated, config } from "react-spring/renderprops";
import { getUserReservation, deleteReservetion } from "./userFunctions";

class Profilo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: "",
      surname: "",
      email: "",
      newPassword: "",
      currentPassword: "",
      msg: "",
      reservationList: "",
      dataReady: false,
    };

    this.changeState = this.changeState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  textStyle = {
    fontSize: 20,
  };

  async componentDidMount() {
    try {
      //get user data
      const userData = jsonwebtoken.decode(localStorage.usertoken);
      this.setState({ name: userData.nome });
      this.setState({ surname: userData.cognome });
      this.setState({ email: userData.email });

      //get user reservations
      getUserReservation(userData.email)
        .then((res) => {
          this.setState({ reservationList: res });
          this.setState({ dataReady: true });
          //console.log(this.state.reservationList);
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

  //made to use reservation list in a more usable data struct
  fetchData = () => {
    var data = [];
    const nReservation = this.state.reservationList.length;
    for (let k = 0; k < nReservation; k++) {
      data.push(this.state.reservationList[k]);
    }
    return data;
  };

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

  handleDelete(data, gymId, event) {
    event.preventDefault();

    const reserveData = {
      email: this.state.email,
      date: data,
      gymId: gymId,
    };

    deleteReservetion(reserveData).then((res) => {
      if (res) window.location.reload();
      else console.log(res);
    });
  }

  render() {
    const dataCard = (
      <div className="card m-4">
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
      <div className="card m-4">
        <h5 className="card-header">Modifica i tuoi dati</h5>
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

    const listItem = () => {
      var item = [];
      var data = this.fetchData();
      const nReservation = Object.keys(data).length;
      const tdClass = "align-middle py-1";
      item.push(
        <tr className="">
          <th>#</th>
          <th>Data</th>
          <th>Palestra</th>
          <th>Orario inizio</th>
          <th>Orario fine</th>
        </tr>
      );
      for (let k = 0; k < nReservation; k++) {
        //console.log(data[k]);
        item.push(
          <tr>
            <td className={tdClass}>
              <b>{k + 1}</b>
            </td>
            <td className={tdClass}>{data[k].data} </td>
            <td className={tdClass}>{data[k].nome}</td>
            <td className={tdClass}>{data[k].orario_inizio}</td>
            <td className={tdClass}>{data[k].orario_fine}</td>
            <td className={tdClass}>
              <a
                className={"btn px-2 btn-danger text-white"}
                onClick={(e) =>
                  this.handleDelete(data[k].data, data[k].id_palestra, e)
                }
              >
                Elimina
              </a>
            </td>
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
    //<ul className="list-group list-group-flush">{listItem()}</ul>

    return (
      <React.Fragment>
        {this.checkLogin()}
        <h1 className="text-white">
          <AnimatedText text={"Bentornato " + this.state.name} point="!" />
        </h1>
        <div className="row w-100">
          <Spring
            from={{ opacity: 0, marginLeft: -300 }}
            to={{ opacity: 1, marginLeft: 0 }}
            config={config.default}
          >
            {(props) => (
              <animated.div style={props} className="mx-5 col-sm-4">
                {this.state.editMode ? editCard : dataCard}
              </animated.div>
            )}
          </Spring>
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={config.default}
          >
            {(props) => (
              <animated.div style={props} className="ml-5 col-sm-6">
                {list}
              </animated.div>
            )}
          </Spring>
        </div>
      </React.Fragment>
    );
  }
}

export default Profilo;
