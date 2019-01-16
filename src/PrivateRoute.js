import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, auth, scopes, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isAuthenticated()) return auth.login();

        if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
          return (
            <h1>
              Unauthorized - You need the following scope(s) to view this page:{" "}
              {scopes.join(",")}.
            </h1>
          );
        }

        return <Component auth={auth} {...props} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  scopes: PropTypes.array
};

PrivateRoute.defaultProps = {
  scopes: []
};

export default PrivateRoute;
