import React, { Component } from "react";
import RegisterForm from "./registerForm";
import { Spring, animated, config } from "react-spring/renderprops";

class Registrati extends Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={config.molasses}
      >
        {(props) => (
          <React.Fragment>
            <animated.div style={props}>
              <RegisterForm></RegisterForm>
            </animated.div>
          </React.Fragment>
        )}
      </Spring>
    );
  }
}

export default Registrati;
