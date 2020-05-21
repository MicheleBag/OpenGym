import React, { Component } from "react";
import { getGymReservation } from "./userFunctions";
class PrenotazioniGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      reservationList: "",
    };
  }

  async componentDidMount() {
    if (this.props.match.params) {
      try {
        const gymId = this.props.match.params.gymId;
        this.setState({ key: gymId });
        getGymReservation(gymId)
          .then((res) => {
            this.setState({ reservationList: res });
            //console.log(this.state.reservationList);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        this.setState({ key: "" });
      }
    }
  }

  render() {
    return <React.Fragment>Prenotazioni per la palestra</React.Fragment>;
  }
}

export default PrenotazioniGym;
