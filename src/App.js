import React from "react";
//import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/styles.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import LoanApplication from "./components/LoanApplication";
import AllLoan from "./components/AllLoan";
import RepayLoan from "./components/RepayLoan";
import UnauthorisedAccess from "./common/UnauthorisedAccess";

const App = () => {
  const isTokenPresent = !!localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {isTokenPresent ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/loan" element={<LoanApplication />} />
              <Route path="/all_loans/:page" element={<AllLoan />} />
              <Route path="/repay/:id" element={<RepayLoan />} />
            </>
          ) : (
            // Redirect to UnauthorisedAccess if the token is not found
            <Route path="*" element={<Navigate to="/unauthorised" />} />
          )}
          <Route path="/unauthorised" element={<UnauthorisedAccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
