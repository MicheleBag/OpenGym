import React, { Component } from "react";
import SearchBar from "./searchBar";
import { Spring, animated, config } from "react-spring/renderprops";
class Home extends Component {
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
              <SearchBar></SearchBar>
            </animated.div>
          </React.Fragment>
        )}
      </Spring>
    );
  }
}

export default Home;
