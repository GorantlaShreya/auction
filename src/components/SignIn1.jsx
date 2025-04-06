import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";


const SignIn1 = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/login", {
                email: formData.username, 
                password: formData.password,
              });              
            localStorage.setItem("token", response.data.token);
            setMessage(response.data.message);
            navigate("/"); 
        } catch (error) {
            setMessage(error.response?.data?.message || "Sign In Failed!");
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    <button type="submit">Sign In</button>
                </form>
                {message && <p className="auth-message">{message}</p>}
            </div>
        </div>
    );
};


export default SignIn1;
