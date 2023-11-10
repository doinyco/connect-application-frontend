import axios from "axios";
import React, { useEffect, useState } from 'react';
import { getGlobalUsername } from "../index.js";
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from './authUtils';
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavUnlisted = styled.ul`
  text-decoration: none;
  gap: 8%;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;  
  font-size: 16px;
  font-family: Georgia, serif;
`

const UserProfile = () => {
  const { username } = getGlobalUsername();
  const ACCESS_TOKEN_KEY = localStorage.getItem('accessToken');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDatafromAPI = async () => {
      try {
        const response = await axios.get(`https://icy-surf-5897.fly.dev/users/${username}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN_KEY}`
          },
          withCredentials: true,
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Couldn't call API", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    };

    if (username && ACCESS_TOKEN_KEY) {
      getUserDatafromAPI();
    }
  }, [username, ACCESS_TOKEN_KEY]);

  const handleLogout = async () => {
    try {
      const ACCESS_TOKEN_KEY = localStorage.getItem('accessToken');
    
      const tokenExpirationTime = new Date(
        parseInt(localStorage.getItem('tokenExpirationTime'))
      );
  
      if (tokenExpirationTime > new Date()) {
        const response = await axios.post(
          'https://icy-surf-5897.fly.dev/users/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
            },
          }
        );
        // Clear user data and token-related information from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpirationTime');
  
        // Navigate to the home page after successful logout
        navigate('/');
      } else {
        console.log('Token is expired. Redirecting to login.');
        // Redirect to login or handle expired token scenario
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <div>
      <NavUnlisted>
        <div className="nav-i">
          <StyledLink className="link" to="/">Home</StyledLink>
        </div>  
      </NavUnlisted>
      </div>
    </div>
  );
}

export default UserProfile;