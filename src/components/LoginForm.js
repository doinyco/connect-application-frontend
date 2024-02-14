import "./LoginForm.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    if (error.response && error.response.status === 401) {
      return { authenticated: false, message: "Incorrect username or password" };
    } else {
      console.error("Oh no no no!", error);
      return { authenticated: false, message: "An error occurred during authentication." };
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
        <div className="log">
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
      <div className="signup">
          <h4>
              New user? <span/><span/><span/><span/>
              <input type="button" onClick={signUpCb} value="Sign up"/>
          </h4>
      </div>
    </div>
  );
};

export default Login;