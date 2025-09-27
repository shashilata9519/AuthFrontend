import React, { useState } from "react";
import { requestOTP } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function RequestOTP() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting API call
    try {
      await requestOTP(email);
      alert("OTP sent to your email!");
      navigate('/reset-password');
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false); // Set loading to false after API call finishes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-30 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Request OTP</h2>
        <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <Link className="text-right text-sm" to="/login">Back to Login</Link>
          <button
            type="submit"
            className="bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-t-4 border-white-600 rounded-full animate-spin mx-auto"></div> // Tailwind spinner
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
        <div className="w-[200px]">
          {Array.isArray(message) ? (
            message.map((item, index) => (
              <p key={index} className="text-red-500 text-[11px]">{item}</p>
            ))
          ) : (
            <p className="text-red-500 text-[11px]">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
