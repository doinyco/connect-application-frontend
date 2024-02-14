import axios from "axios";
import React, { useEffect, useState } from 'react';
import { getGlobalUsername } from "../index.js";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Link } from "react-router-dom";
import EventForm from "./EventForm.js";
import { getUserEvents } from '../backendAPI';
import EventContainer from "./EditEvent.js";
import EditUser from "./EditUser.js";

const NavUnlisted = styled.ul`
  text-decoration: none;
  gap: 8%;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;  
  font-size: 16px;
  font-family: Georgia, serif;`

const UserProfile = () => {
  const { username } = getGlobalUsername();
  const ACCESS_TOKEN_KEY = localStorage.getItem('accessToken');
  const [userData, setUserData] = useState(null);
  const [events, setUserEvents] = useState([])
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [isUserFormVisible, setIsUserFormVisible] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDatafromAPI = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/users/${username}`, {
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

  const isTokenExpired = () => {
    const tokenExpirationTime = parseInt(localStorage.getItem('tokenExpirationTime'));
    return Date.now() > tokenExpirationTime;
  };

  const handleLogout = async () => {
    try {
      const ACCESS_TOKEN_KEY = localStorage.getItem('accessToken');
    
      const tokenExpirationTime = new Date(
        parseInt(localStorage.getItem('tokenExpirationTime'))
      );
  
      if (tokenExpirationTime > new Date()) {
        const response = await axios.post(
          'http://127.0.0.1:5000/users/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
            },
          }
        );
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpirationTime');
  
        navigate('/');
      } else {
        console.log('Token is expired. Redirecting to login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [userData]);

  const AccessToken = localStorage.getItem('accessToken');
  const fetchEvents = async () => {
    try {
      if (userData && !isTokenExpired()) {
        const eventsData = await getUserEvents(userData.user_id);
        setUserEvents(eventsData);
      }
    } catch (error) {
      console.log('Oh no no!', error);
    }
  };

  const toggleEventList = () => {
    setShowAllEvents(!showAllEvents);
  };

  const toggleEventForm = () => {
    setIsEventFormVisible(!isEventFormVisible);
  };

  const handleEditButtonClick = () => {
    setIsUserFormVisible(!isUserFormVisible);
  };
  

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        {isUserFormVisible && userData && (
            <EditUser showEditButton={true} showDeleteButton={true} user={userData} />
          )}
          <button onClick={handleEditButtonClick}>
            {isUserFormVisible ? 'Close Edit Form' : 'Edit User Profile'}
          </button>
          <button onClick={handleLogout}>Logout</button>
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
      <button onClick={toggleEventForm}>
        {isEventFormVisible ? 'Close' : 'Create Event'}
      </button>
      {isEventFormVisible && userData && (
        <EventForm userData={userData} />
      )}
      <button onClick={toggleEventList}>
        {showAllEvents ? 'Hide Events' : 'Show All Events'}
      </button>

      {showAllEvents ? (
        events.map((event) => (
          <EventContainer
            key={event.event_id}
            event={event}
            showDeleteButton={true} 
            showEditButton={true}
          />
        ))
      ) : null}
    </div>
  );
}

export default UserProfile;