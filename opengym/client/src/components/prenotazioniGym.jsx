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
    for (let index = 0; index < 6; index++) {
      data.push(this.state.reservationList[index]);
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
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
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
