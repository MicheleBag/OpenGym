import React, { Component } from "react";
import { login } from "./userFunctions";
import { Spring, animated, config } from "react-spring/renderprops";

class LoginForm extends Component {
  formStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  textStyle = {
    fontSize: 30,
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false, //used to redirect when submitting
      email: "",
      password: "",
      chkbox: false,
      redirectPath: "/profilo",
      errorMsg: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeChk(event) {
    this.setState({ chkbox: !this.state.chkbox });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      admin: this.state.chkbox,
    };
    if (this.state.chkbox) {
      //Admin login
      this.setState({ redirectPath: "/admin" });
    } else {
      //User login
      this.setState({ redirectPath: "/profilo" });
    }
    login(user)
      .then((res) => {
        if (res) {
          this.setState({ submitted: false });
          localStorage.setItem("loginDone", true);
          this.props.history.push(this.state.redirectPath);
        } else this.setState({ errorMsg: "Errore: credenziali errate" });
      })
      .catch((err) => {
        this.setState({ errorMsg: "Errore: server non risponde" });
        console.log(err);
      });
  }

  render() {
    return (
      <Spring
        from={{
          opacity: 0,
        }}
        to={{
          opacity: 1,
        }}
        config={config.molasses}
      >
        {(props) => (
          <React.Fragment>
            <animated.div style={props}>
              <form
                style={this.formStyle}
                className="border border-white rounded p-4"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <label style={this.textStyle} className="text-white">
                    Indirizzo Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required="required"
                    placeholder="Inserisci la tua email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label style={this.textStyle} className="text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required="required"
                    //pattern=".{8,}"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="adminCheck"
                    defaultChecked={this.state.chkbox}
                    onChange={this.handleChangeChk}
                  />
                  <label class="form-check-label text-white">
                    Sei un gestore di una palestra?
                  </label>
                </div>
                <input
                  className="btn btn-warning btn-lg mt-2  border border-dark"
                  type="submit"
                  value="Accedi"
                />
                <p className={" text-warning font-weight-bold mt-1 mb-0"}>
                  {this.state.errorMsg}
                </p>
              </form>
            </animated.div>
          </React.Fragment>
        )}
      </Spring>
    );
  }
}

export default LoginForm;
