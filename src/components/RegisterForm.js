import "./RegisterForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CreateProfile = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registrationStatus, setRegistrationStatus] = useState(null);
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
        const response = await axios.post(`https://icy-surf-5897.fly.dev/users/register`, {
            "username": username,
            "email": email,
            "password": password,
        })
        setRegistrationStatus("success");
        navigate("/login")
      } catch (error) {
        setRegistrationStatus("error");
        console.error("Error during registration:", error);
      }
  };

  return (
    <div>
      <h2>Create User Profile</h2>
      {registrationStatus === "success" && <p>Registration successful. You can now log in.</p>}
      {registrationStatus === "error" && <p>Registration failed. Please check your input.</p>}
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