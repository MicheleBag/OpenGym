import React, { Component } from "react";
import { getGymList } from "./userFunctions";

class Risultati extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      gymList: "",
    };
  }

  titleStyle = {
    fontSize: 30,
  };

  async componentDidMount() {
    if (this.props.match.params) {
      try {
        const gymName = this.props.match.params.gymName;
        this.setState({ key: gymName });
        getGymList(gymName)
          .then((res) => {
            this.setState({ gymList: res });
            console.log(this.state.gymList);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        this.setState({ key: "" });
      }
    }
  }

  fetchData() {
    var data = [];
    for (let k = 0; k < this.state.gymList.length; k++) {
      data.push({
        id_palestra: this.state.gymList[k].id_palestra,
        nome: this.state.gymList[k].nome,
        indirizzo: this.state.gymList[k].indirizzo,
        immagine: this.state.gymList[k].immagine,
      });
    }
    console.log(data.immagine);
    return data;
  }

  render() {
    var data = this.fetchData();
    const list = data.map((d) => (
      <div className="col-sm-3">
        <div className="card m-1">
          <img
            className="card-img-top p-2"
            src="" //{d.immagine} //non funziona
            alt="gym pic"
          />
          <div className="card-body">
            <h5 className="card-title">{d.nome}</h5>
            <p className="card-text">{d.indirizzo}</p>
            <a href="#" className="btn btn-primary">
              Prenota ora
            </a>
          </div>
        </div>
      </div>
    ));

    return (
      <React.Fragment>
        <h1 className="text-white mb-5 mt-2">
          Lista risultati per "{this.state.key}"
        </h1>
        <div className="row m-0">{list}</div>
      </React.Fragment>
    );
  }
}

export default Risultati;
