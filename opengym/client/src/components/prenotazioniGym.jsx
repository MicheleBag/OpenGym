import React, { Component } from "react";
import { getGymReservation } from "./userFunctions";
class PrenotazioniGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      reservationList: "",
      dataReady: false,
    };
  }

  async componentDidMount() {
    if (this.props.match.params && localStorage.usertoken) {
      try {
        const gymId = this.props.match.params.gymId;
        this.setState({ key: gymId });
        getGymReservation(gymId)
          .then((res) => {
            this.setState({ reservationList: res });
            this.setState({ dataReady: true });
            //console.log(this.state.reservationList);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        this.setState({ key: "" });
      }
    } else {
      this.props.history.push("/accedi");
    }
  }

  fetchData = () => {
    var data = [];
    for (let k = 0; k < 6; k++) {
      data.push(this.state.reservationList["day" + k]);
    }
    return data;
  };

  render() {
    const tableHead = () => {
      var data = this.fetchData();
      console.log(data);
      return data.map((d) => (
        <React.Fragment>
          <th scope="col">{d[10].date}</th>
        </React.Fragment>
      ));
    };

    const tableRow = () => {
      var data = this.fetchData();
      console.log(data);

      var row = [];
      for (let j = 0; j < 10; j++) {
        row.push(<tr />);
        row.push(<td>{data[0][j].start_session}</td>);
        for (let i = 0; i < 6; i++) {
          row.push(<td>{data[i][j].remaining_places}</td>);
        }
      }
      return row;
    };

    const pagina = () => {
      return (
        <React.Fragment>
          <h1>Prenotazioni per la palestra</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                {tableHead()}
              </tr>
            </thead>
            <tbody>{tableRow()}</tbody>
          </table>
        </React.Fragment>
      );
    };

    const paginaVuota = <h1>dati non pronti</h1>;

    return (
      <React.Fragment>
        {this.state.dataReady ? pagina() : paginaVuota}
      </React.Fragment>
    );
  }
}

export default PrenotazioniGym;
