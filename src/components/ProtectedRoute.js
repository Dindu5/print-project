import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const AuthToken = localStorage.getItem("AuthToken");
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
