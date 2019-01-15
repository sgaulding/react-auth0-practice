import React, { Component } from "react";

class Callback extends Component {
  componentDidMount() {
    if (!/access_token|id_token|error/.test(this.props.location.hash)) {
      throw new Error("Invalid Callback URL");
    }

    this.props.auth.handleAuthentication();
  }

  render() {
    return <h1> Loading</h1>;
  }
}

export default Callback;
