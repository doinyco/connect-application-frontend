import "./LoginForm.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { setGlobalUsername } from "../index.js";

const authenticateUser = (username, password, cb) => {
  const ACCESS_TOKEN_KEY = 'accessToken';
  const TOKEN_EXPIRATION_KEY = 'tokenExpirationTime';

  axios.post(`https://icy-surf-5897.fly.dev/users/login`, {
    username: username,
    password: password,
  }).then((response) => {
    const user = {
      user_id: response.data.user_id,
      username: response.data.username,
    };

    setGlobalUsername(user);
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);

    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + response.data.expires_in);
    localStorage.setItem(TOKEN_EXPIRATION_KEY, expirationTime.getTime());

    cb(true);
  }).catch((error) => {
    console.log("Oh no no no!", error);
  });
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleFormInput = (event) => {
      setUsername(event.target.value)
  };

  const handlePasswordInput = (event) => {
      setPassword(event.target.value)
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();

    authenticateUser(username, password, (authenticated) => {
        if (authenticated) {
            navigate(`/profile/${username}`);
        } else {
            console.log("Authentication failed");
        }
    });
};

  const signUpCb = () => {
      navigate(`/register`);
  }

  return (
      <div className="login">
          <h3>Log In</h3>
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