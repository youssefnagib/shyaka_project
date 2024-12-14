import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setSuccess("Login successful!");
                // Optional: Save the user data or token
                console.log("User data:", data);
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                navigate("/");
                window.location.reload(); 
                // Redirect or handle successful login here
            } else {
                setError(data.error || "Login failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9f9f9" }}>
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px" }}>
                <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Login</h1>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
                        Login
                    </button>
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
