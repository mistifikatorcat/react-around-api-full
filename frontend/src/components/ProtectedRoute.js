import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, ...props }) => {
  const token = localStorage.getItem('jwt');
  return (
    <Route {...props}>
      {isLoggedIn || token ? children : <Redirect to={"/signin"} />}
    </Route>
  );
};

export default ProtectedRoute;
