import React, { Component } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AuthContext from "./AuthContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: new Auth(this.props.history) };
  }

  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/callback" component={Callback} />
          <PublicRoute path="/public" component={Public} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/private" component={Private} />
          <PrivateRoute
            path="/courses"
            component={Courses}
            scopes={["read:courses"]}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
