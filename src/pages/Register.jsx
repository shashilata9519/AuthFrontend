import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting API call
    try {
      await registerUser(form);
      alert("Registration successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false); // Set loading to false after API call finishes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Register</h2>
        <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-t-4 border-white-600 rounded-full animate-spin mx-auto "></div> 
            ) : (
              "Register"
            )}
          </button>
          <Link className="text-right text-sm" to="/login">Have a Login?</Link>
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
