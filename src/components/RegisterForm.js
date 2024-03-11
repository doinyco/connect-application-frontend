import "./RegisterForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavUnlisted2 = styled.ul`
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 100%;
`;
const StyledLink2 = styled(Link)`
  text-decoration: none;
  padding: 5px 10px;
  display: block;
  margin-top: 50px;
  color: #4CAF50;
  &:hover {
    color: #45a049; 
  }
`

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
    if (!username || !email || !password) {
      setRegistrationStatus({ status: "error", message: "Please fill in all fields." });
      return;
    }
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
    <div className='create-user'>
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
            type="password"
            placeholder=" Password"
            value={password}
            onChange={handlePasswordInput}
          />
          <div className="signup-s">
            <input type="submit" value="CREATE" /> 
          </div>     
      </form>
      <NavUnlisted2>
          <StyledLink2 className="link" to="/">Main page</StyledLink2>
          <StyledLink2 className="link" to="/login">Login</StyledLink2>
      </NavUnlisted2>
    </div>
  )
};

export default CreateProfile;