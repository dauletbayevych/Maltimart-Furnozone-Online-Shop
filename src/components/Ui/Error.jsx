import React from "react";
import { Navigate } from "react-router-dom";
import "../../styles/Error.css";
const Error = () => {
  return (
    <div className="Error__container">
      <h3>404!Error Page not found</h3>
      <Navigate to="/home"> Home</Navigate>
    </div>
  );
};

export default Error;
