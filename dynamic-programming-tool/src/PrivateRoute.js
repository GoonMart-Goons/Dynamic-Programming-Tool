import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Database/Auth";

const PrivateRoute = ({ element: Element }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Element /> : <Navigate to="/" />;
};

export default PrivateRoute;


