import React, { useState } from "react";
import SignupForm from "./SignupForm"; // ✅ Import SignupForm
import LoginForm from "./LoginForm";   // ✅ Import LoginForm
import "./Header.css"; // ✅ Import the CSS file
import logo from "../assets/logo.jpg";

const Header = () => {
    const [showForm, setShowForm] = useState(null); // ✅ 'signup' or 'login'

    return (
        <header className="header">
            {/* ✅ Logo Container */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" /> {/* ✅ Use Image Here */}
                
            </div>

            {/* ✅ Website Name */}
            <div className="site-name">Student News Hub</div>

            {/* ✅ Search Bar */}
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search..." />
            </div>

            {/* ✅ Login Button */}
            <div className="user-login">
                <button className="login-btn" onClick={() => setShowForm(showForm ? null : "options")}>Login</button>
                
                {/* 🔹 Show Options for Signup/Login */}
                {showForm === "options" && (
                    <div className="dropdown-menu">
                        <button onClick={() => setShowForm("login")}>Login</button>
                        <button onClick={() => setShowForm("signup")}>Sign Up</button>
                    </div>
                )}
            </div>

            {/* 🔹 Show Signup Form */}
            {showForm === "signup" && <SignupForm closeForm={() => setShowForm(null)} />}

            {/* 🔹 Show Login Form */}
            {showForm === "login" && <LoginForm closeForm={() => setShowForm(null)} />}
        </header>
    );
};

export default Header;
