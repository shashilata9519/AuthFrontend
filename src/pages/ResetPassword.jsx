import React, { useState } from "react";
import { resetPassword } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setMessage("");   // Clear previous messages
        try {
            await resetPassword(form);
            alert("Password reset successful!");
            navigate('/login');
        } catch (err) {
            setMessage(err.response?.data?.message || "Error resetting password");
        } finally {
            setLoading(false); // Stop loading
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen px-30  bg-gray-100">
            <div className="bg-white  rounded-2xl shadow-2xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Reset Password</h2>
                <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        placeholder="Email"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onChange={handleChange}
                    />
                    <input
                        name="otp"
                        placeholder="OTP"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onChange={handleChange}
                    />
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="New Password"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onChange={handleChange}
                    />
                    <Link className="text-right text-sm" to="/login">Back to Login</Link>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-4 border-t-4 border-white-600 rounded-full animate-spin mx-auto"></div> // Tailwind spinner
                        ) : (
                            "Reset Password"
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
