import React from "react";
import { Route, Redirect } from "react-router-dom";

let setUp = true;
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      setUp ? (
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
export default ProtectedRoute;
