import React, { useState, useEffect } from "react";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); 

    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const res = await loginUser(form);
            localStorage.setItem("token", res.data.accessToken);
            alert("Login successful!");
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false); 
        }
    };

    
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="flex justify-center items-center min-h-screen px-30 bg-gray-100">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Login</h2>
                <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={handleChange}
                        value={form.email}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        onChange={handleChange}
                        value={form.password}
                        required
                    />
                    <Link className="text-right text-sm" to="/request-otp">
                        Forgot Password
                    </Link>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-4 border-t-4 border-white-600 rounded-full animate-spin mx-auto "></div> // Tailwind spinner
                        ) : (
                            "Login"
                        )}
                    </button>
                    <Link className="text-right text-sm" to="/register">
                        Don't have an account
                    </Link>
                </form>
                <div className="w-[200px]">
                    {Array.isArray(message) ? (
                        message.map((item, index) => (
                            <p key={index} className="text-red-500 text-[11px]">
                                {item}
                            </p>
                        ))
                    ) : (
                        <p className="text-red-500 text-[11px]">{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
