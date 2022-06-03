import React, { Component } from "react";
import { Transition } from "react-spring/renderprops";

class AnimatedText extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="d-flex flex-row">
          <Transition
            items={this.props.text}
            keys={(item) => item.key}
            from={{ opacity: 0, transform: "translate3d(-40px,0,0)" }}
            enter={{ opacity: 1, transform: "translate3d(0px,0,0)" }}
            config={{ duration: 500 }}
          >
            {(item) => (props) => (
              <p className="mb-1 ml-auto" style={props}>
                {item}
              </p>
            )}
          </Transition>
          <Transition
            items={this.props.point}
            keys={(item) => item.key}
            from={{ opacity: 0, transform: "translate3d(0,-40px,0)" }}
            enter={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
            config={{ delay: 500, duration: 300 }}
          >
            {(item) => (props) => (
              <p className="mb-1 mr-auto mt-auto" style={props}>
                {this.props.point}
              </p>
            )}
          </Transition>
        </div>
      </React.Fragment>
    );
  }
}

export default AnimatedText;
