import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  return (<Route> 
    {() => loggedIn ? children : <Redirect to="./"/>}
  </Route>)
  //return loggedIn ? children : <Redirect to="./" />;
}

export default ProtectedRoute;

