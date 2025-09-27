import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RequestOTP from "./pages/RequestOTP";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      {/* <nav className="flex justify-center gap-6 mb-8 mt-4 text-white font-semibold">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/request-otp">Request OTP</Link>
        <Link to="/reset-password">Reset Password</Link>
      </nav> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-otp" element={<RequestOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
