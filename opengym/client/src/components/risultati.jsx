import React, { Component } from "react";
import { getGymList } from "./userFunctions";
import { Spring, animated, config } from "react-spring/renderprops";
import AnimatedText from "./animatedText";

class Risultati extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReady: false, //async call so data may be not ready
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
            this.setState({ dataReady: true });
            //console.log(this.state.gymList);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        this.setState({ key: "" });
      }
    }
  }

  //fetch data in a more usable struct
  fetchData() {
    var data = [];
    for (let k = 0; k < this.state.gymList.length; k++) {
      data.push({
        id_palestra: this.state.gymList[k].id_palestra,
        nome: this.state.gymList[k].nome,
        città: this.state.gymList[k].città,
        indirizzo: this.state.gymList[k].indirizzo,
        immagine: this.state.gymList[k].immagine.data,
      });
    }
    return data;
  }

  render() {
    const renderList = () => {
      const data = this.fetchData();
      const list = data.map((d) => (
        <div className="col-sm-3">
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={(config.molasses, { delay: 200 })}
          >
            {(props) => (
              <React.Fragment>
                <animated.div style={props}>
                  <div className="card m-1">
                    <img
                      className="card-img-top p-2"
                      src={
                        "data:image/png;base64," +
                        btoa(String.fromCharCode.apply(null, d.immagine))
                      }
                      alt="gym pic"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{d.nome}</h5>
                      <p className="card-text">
                        {d.città}, {d.indirizzo}
                      </p>
                      <a
                        href={"/prenotazioni/" + d.id_palestra}
                        className="btn btn-primary"
                      >
                        Prenota ora
                      </a>
                    </div>
                  </div>
                </animated.div>
              </React.Fragment>
            )}
          </Spring>
        </div>
      ));
      return list;
    };

    const page = () => {
      return (
        <React.Fragment>
          <h1 className="text-white mb-5 mt-2">
            <AnimatedText
              text={"Lista risultati per: "}
              point={" '" + this.state.key + "'"}
            />
          </h1>
          <div className="row m-0">{renderList()}</div>
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

export default Risultati;
