import React, { Component } from "react";
import { getGymReservation, reserve } from "./userFunctions";
import AnimatedText from "./animatedText";
import jsonwebtoken from "jsonwebtoken";

class PrenotazioniGym extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      reservationList: "",
      dataReady: false,
      submitted: false,
      date: "",
      timeStart: "",
      timeEnd: "",
      name: "",
      surname: "",
      email: "",
      msg: "",
    };
    this.changeState = this.changeState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    //check if got gymID and user is logged in
    if (this.props.match.params && localStorage.usertoken) {
      try {
        //get user data
        const userData = jsonwebtoken.decode(localStorage.usertoken);
        this.setState({ name: userData.nome });
        this.setState({ surname: userData.cognome });
        this.setState({ email: userData.email });

        //get gym reservation info
        const gymId = this.props.match.params.gymId;
        this.setState({ id: gymId });
        getGymReservation(gymId)
          .then((res) => {
            this.setState({ reservationList: res });
            this.setState({ dataReady: true });
            console.log(this.state.reservationList);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        this.setState({ id: "" });
      }
    } else {
      this.props.history.push("/accedi");
    }
  }

  //made to use reservation list in a more usable data struct
  fetchData = () => {
    var data = [];
    for (let k = 0; k < 6; k++) {
      data.push(this.state.reservationList["day" + k]);
    }
    return data;
  };

  //used to get date and hours when user's click on a btn and change render components
  changeState = (i, j, e) => {
    if (i === false) this.setState({ submitted: false });
    else {
      this.setState({ submitted: true });
      var data = this.fetchData();
      var day = data[i][10].date;
      var timeStart = data[i][j].start_session;
      var timeEnd = data[i][j].finish_session;
      this.setState({
        timeStart: timeStart,
        timeEnd: timeEnd,
        date: day,
      });
    }

    //console.log(this.state.submitted);
  };

  handleSubmit(event) {
    event.preventDefault();

    const reservationData = {
      id: this.state.id,
      email: this.state.email,
      data: this.state.date,
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
    };

    reserve(reservationData).then((res) => {
      //controllo risposta
      if (res) {
        this.setState({ msg: "Prenotazione effettuata!" });
        console.log(res);
      } else this.setState({ msg: "Ops! Qualcosa è andato storto" });
    });
  }

  render() {
    const tableHead = () => {
      var data = this.fetchData();
      console.log(data);
      return data.map((d) => (
        <React.Fragment>
          <th scope="col" className="p-1">
            {d[10].date}
          </th>
        </React.Fragment>
      ));
    };

    const tableRow = () => {
      var data = this.fetchData();
      //console.log(data);
      var row = [];
      var style = "btn-outline-primary";

      for (let j = 0; j < 10; j++) {
        row.push(<tr />);
        row.push(
          <th scope="row" className="p-1 align-middle">
            {data[0][j].start_session + " -- " + data[0][j].finish_session}
          </th>
        );
        for (let i = 0; i < 6; i++) {
          if (data[i][j].remaining_places < 10) style = "btn-outline-danger";
          if (data[i][j].remaining_places < 1) {
            style = "btn-outline-secondary disabled";
          }
          row.push(
            <td className="p-1">
              <a
                className={"btn px-4 " + style}
                onClick={(e) => this.changeState(i, j, e)}
              >
                {data[i][j].remaining_places}
              </a>
            </td>
          );
        }
      }
      return row;
    };

    const table = () => (
      <div className="col-10">
        <table className="table table-bordered bg-white mt-5">
          <thead>
            <tr>
              <th scope="col" className="p-1">
                Posti disponibili
              </th>
              {tableHead()}
            </tr>
          </thead>
          <tbody>{tableRow()}</tbody>
        </table>
      </div>
    );

    const form = () => (
      <div className="col-8">
        <div className="card mx-5">
          <h5 className="card-header">Effettua prenotazione</h5>
          <div className="card-body p-2">
            <form
              style={this.formStyle}
              className="border border-white rounded p-3"
              onSubmit={this.handleSubmit}
            >
              <div class="row">
                <div class="col-sm-6">
                  <div className="form-group form-inline">
                    <label style={this.textStyle} className="ml-4 mr-auto">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control m-1"
                      name="name"
                      value={this.state.name}
                      disabled
                    />
                  </div>

                  <div className="form-group form-inline">
                    <label style={this.textStyle} className="ml-4 mr-auto">
                      Cognome
                    </label>
                    <input
                      type="text"
                      className="form-control m-1"
                      name="surname"
                      value={this.state.surname}
                      disabled
                    />
                  </div>
                  <div className="form-group form-inline">
                    <label style={this.textStyle} className="ml-4 mr-auto">
                      Indirizzo email
                    </label>
                    <input
                      type="email"
                      className="form-control m-1"
                      name="email"
                      value={this.state.email}
                      disabled
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div className="form-group form-inline">
                    <label style={this.textStyle} className="ml-4 mr-auto">
                      Giorno
                    </label>
                    <input
                      type="text"
                      className="form-control m-1"
                      name="date"
                      value={this.state.date}
                      disabled
                    />
                  </div>
                  <div className="form-group form-inline">
                    <label style={this.textStyle} className="ml-4 mr-auto">
                      Ora Inizio
                    </label>
                    <input
                      type="text"
                      className="form-control m-1"
                      required="required"
                      name="time"
                      value={this.state.timeStart}
                      disabled
                    />
                  </div>

                  <div className="form-group form-inline">
                    <label style={this.textStyle} className="ml-4 mr-auto">
                      Ora Fine
                    </label>
                    <input
                      type="text"
                      className="form-control m-1"
                      required="required"
                      name="time"
                      value={this.state.timeEnd}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="form-group form-inline">
                <button
                  onClick={(e) => this.changeState(false, false, e)}
                  className="btn btn-link mr-3 col-sm-5"
                >
                  Annulla
                </button>
                <input
                  className="btn btn-warning btn-lg mt-2 px-1 col-sm-5 border border-dark"
                  type="submit"
                  value="Prenota"
                ></input>
              </div>
              <p className={"font-weight-bold mt-1 mb-0"}>{this.state.msg}</p>
            </form>
          </div>
        </div>
      </div>
    );

    const page = () => {
      return (
        <React.Fragment>
          <h1 className="text-white">
            <AnimatedText text="Prenotazioni diponibili" point="" />
          </h1>
          <div className="row justify-content-center m-5">
            {this.state.submitted ? form() : table()}
          </div>
        </React.Fragment>
      );
    };

    const emptyPage = <h1>Data loading</h1>;

    return (
      <React.Fragment>
        {this.state.dataReady ? page() : emptyPage}
      </React.Fragment>
    );
  }
}

export default PrenotazioniGym;
