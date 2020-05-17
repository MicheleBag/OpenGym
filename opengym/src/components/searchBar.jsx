import React, { Component } from "react";

class SearchBar extends Component {
  styles = {
    fontSize: 12,
  };
  render() {
    return (
      <React.Fragment>
        <form className="form-inline">
          <input
            style={this.styles}
            class="form-control mb-2 mr-sm-2"
            type="text"
            name="gymName"
            defaultValue="Nome palestra"
          />
          <input class="btn btn-primary mb-2" type="submit" value="Cerca" />
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
