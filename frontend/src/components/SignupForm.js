import React, { useState } from "react";
import "./AuthForm.css"; // ✅ Shared styles for Login & Signup

const SignupForm = ({ closeForm }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profession, setProfession] = useState("");
    const [college, setCollege] = useState("");
    const [year_of_study, setYearOfStudy] = useState(""); // ✅ Updated key
    const [branch, setBranch] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, profession, college, year_of_study, branch }), // ✅ Corrected key
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Signup successful! You can now log in.");
                setTimeout(closeForm, 2000); // Auto close after success
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="auth-form">
                <button className="close-btn" onClick={closeForm}>✖</button>
                <h2>Sign Up</h2>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label>Profession</label>
                    <input 
                        type="text" 
                        placeholder="Enter your profession" 
                        value={profession} 
                        onChange={(e) => setProfession(e.target.value)}
                    />

                    <label>College</label>
                    <input 
                        type="text" 
                        placeholder="Enter your college name" 
                        value={college} 
                        onChange={(e) => setCollege(e.target.value)}
                    />

                    <label>Year of Study</label>
                    <select value={year_of_study} onChange={(e) => setYearOfStudy(e.target.value)}>
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>

                    <label>Branch</label>
                    <input 
                        type="text" 
                        placeholder="Enter your branch" 
                        value={branch} 
                        onChange={(e) => setBranch(e.target.value)}
                    />

                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
