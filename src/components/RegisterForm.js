import "./RegisterForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProfile = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registrationStatus, setRegistrationStatus] = useState({ status: null, message: "" });
  const navigate = useNavigate()

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value)
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    createUser();
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/users/register`, {
        "username": username,
        "email": email,
        "password": password,
      });
      setRegistrationStatus({ status: "success", message: "Registration successful. You can now log in." });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setRegistrationStatus({ status: "error", message: "Username already exists. Please choose another one." });
      } else {
        setRegistrationStatus({ status: "error", message: "Registration failed. Please check your input." });
      }
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <h2>Create User Profile</h2>
      {registrationStatus.status === "success" && <p>{registrationStatus.message}</p>}
      {registrationStatus.status === "error" && <p>{registrationStatus.message}</p>}
      <form onSubmit={handleFormSubmission}>
        <input
            name="username"
            type="text"
            placeholder=" User name"
            value={username}
            onChange={handleUsernameInput}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailInput}
          />
          <input
            name="password"
            type="text"
            placeholder=" Password"
            value={password}
            onChange={handlePasswordInput}
          />
          <div className="signup-s">
            <input type="submit" value="CREATE" /> 
          </div>     
      </form>
    </div>
  )
};

export default CreateProfile;