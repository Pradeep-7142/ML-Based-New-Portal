import React, { useState } from "react";
import SignupForm from "./SignupForm"; // ✅ Import SignupForm
import LoginForm from "./LoginForm";   // ✅ Import LoginForm

const Header = () => {
    const [showForm, setShowForm] = useState(null); // ✅ 'signup' or 'login'

    return (
        <header className="header">
            <div className="logo">
                <h1>Student News Hub</h1>
            </div>

            <nav>
                <ul>
                    <li><button>Engineering</button></li>
                    <li><button>Medicine</button></li>
                    <li><button>Business</button></li>
                    <li><button>Arts</button></li>
                    <li><button>Science</button></li>
                    <li><button>Technology</button></li>
                </ul>
            </nav>

            <div className="search-login">
                <input type="text" placeholder="Search..." />
                <button className="login-btn" onClick={() => setShowForm("options")}>Login</button> 
            </div>

            {/* 🔹 Show Options for Signup/Login */}
            {showForm === "options" && (
                <div className="auth-options">
                    <button onClick={() => setShowForm("login")}>Login</button>
                    <button onClick={() => setShowForm("signup")}>Sign Up</button>
                </div>
            )}

            {/* 🔹 Show Signup Form */}
            {showForm === "signup" && <SignupForm closeForm={() => setShowForm(null)} />}

            {/* 🔹 Show Login Form */}
            {showForm === "login" && <LoginForm closeForm={() => setShowForm(null)} />}
        </header>
    );
};

export default Header;
