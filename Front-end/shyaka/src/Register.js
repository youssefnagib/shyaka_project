import React, { useState } from "react";
import RegisterForm from "./RegisterForm"; // Import the form component
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirmationPassword: "",
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

        if (formData.password !== formData.confirmationPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.details + " --- Please Login");
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    username: "",
                    password: "",
                    confirmationPassword: "",
                });
                setTimeout(() => {
                    navigate("/login"); // Redirect to login
                }, 2000);
            } else {
                console.log(data)
                setError(data.username || data.details || "Registration failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <RegisterForm success={success} error={error} formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );
};

export default Register;
