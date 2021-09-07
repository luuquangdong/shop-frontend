import React from "react";
import PropTypes from "prop-types";
import useAuth from "utils/useAuth";
import { Redirect, Route } from "react-router";

function ProtectedRoute(props) {
  const { component: Component, roles, ...rest } = props;
  const { token, role } = useAuth();

  console.log({ token, role });
  if (token && !role) return <div>...</div>;
  if (!token && !role) return <Redirect to="/not-found" />;
  if (roles.includes(role))
    return (
      <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
    );
  return <Redirect to="/not-found" />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  roles: PropTypes.array.isRequired,
};

export default ProtectedRoute;
