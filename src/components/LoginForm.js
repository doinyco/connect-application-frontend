import "./LoginForm.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavUnlisted3 = styled.ul`
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 100%;
`;
const StyledLink3 = styled(Link)`
  text-decoration: none;
  padding: 5px 10px;
  display: block;
  margin-top: 30px;
`

const authenticateUser = async (username, password) => {
  const ACCESS_TOKEN_KEY = 'accessToken';
  const TOKEN_EXPIRATION_KEY = 'tokenExpirationTime';

  try {
    const response = await axios.post(`http://127.0.0.1:5000/users/login`, {
      username: username,
      password: password,
    });

    const user = {
      user_id: response.data.user_id,
      username: response.data.username,
    };

    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);

    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + response.data.expires_in);
    localStorage.setItem(TOKEN_EXPIRATION_KEY, expirationTime.getTime());

    return { authenticated: true, message: "User successfully logged in!" };
  } catch (error) {
    if (error.response && error.response.data) {
      return { authenticated: false, message: error.response.data.message };
    } else if (error.response && error.response.status === 404){
      return { authenticated: false, message: error.response.data.message };
    }
  }
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState({ status: null, message: "" });
  const navigate = useNavigate()

  const handleFormInput = (event) => {
      setUsername(event.target.value)
  };

  const handlePasswordInput = (event) => {
      setPassword(event.target.value)
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
  
    try {
      const response = await authenticateUser(username, password);
  
      if (response.authenticated) {

        navigate(`/profile/${username}`);
      } else {
        setLoginStatus({ status: "error", message: response.message || "An unexpected error occurred during authentication." });
      }
    } catch (error) {
      console.error("Authentication error:", error);
  
      if (error.response && error.response.data) {
        setLoginStatus({ status: "error", message: error.response.data.message });
      }
    }
  };

  const signUpCb = () => {
      navigate(`/register`);
  }

  return (
    <div className="login">
      <h3>Log In</h3>
      {loginStatus.message && <p>{loginStatus.message}</p>}
      <form onSubmit={handleFormSubmission}>
        <div className="login-form">
          <input
              name="username"
              type="text"
              placeholder=" Username"
              value={username}
              onChange={handleFormInput}
          />
          <input
              name="password"
              type="password"
              placeholder=" Password"
              value={password}
              onChange={handlePasswordInput}
          />
          <div className="log-button">
              <input type="submit" value="Log In" />
          </div>
        </div>
      </form>
      <NavUnlisted3>
          <StyledLink3 className="link" to="/">Main page</StyledLink3>
          <StyledLink3 className="link" to="/register">New user? Sign-up</StyledLink3>
      </NavUnlisted3>
    </div>
  );
};

export default Login;