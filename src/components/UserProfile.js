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
import './UserProfile.css';

const NavUnlisted = styled.ul`
  text-decoration: none;
  display: flex;
  position: absolute;
  top: 5px;
  right: 30px;
  display: flex;
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;  
`

const UserProfile = () => {
  const { username } = getGlobalUsername();
  const ACCESS_TOKEN_KEY = localStorage.getItem('accessToken');
  const [userData, setUserData] = useState(null);
  const [events, setUserEvents] = useState([])
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [isEditUserFormVisible, setIsEditUserFormVisible] = useState(false);
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

  const toggleEditUserForm = () => {
    setIsEditUserFormVisible(!isEditUserFormVisible);
  };
  
  return (
    <div className='user-profile'>
      <div>
        <NavUnlisted>
          <div className="nav-i">
            <StyledLink className="link" to="/">Main page</StyledLink>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
          </div>
        </NavUnlisted>
      </div>
      <div className='main-user'>
          <h2>Welcome</h2>
          <div className="user-profile-section">
            {userData ? (
              <div className="section-1">
              <p className="user-info">{userData.username}<br />{userData.email}</p>
              {isEditUserFormVisible && userData && (
                <EditUser showEditButton={true} showDeleteButton={true} user={userData}  onClose={toggleEditUserForm}/>
              )}
              <button className='action-buttons' onClick={toggleEditUserForm}>
                {isEditUserFormVisible ? 'Close Edit Form' : 'Edit profile'}
              </button>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
            <button className='action-buttons' onClick={toggleEventForm}>
              {isEventFormVisible ? 'Close' : 'Create event'}
            </button>
            {events.length === 0 && showAllEvents && <p>No events saved.</p>}
            {isEventFormVisible && userData && (
              <EventForm userData={userData} onClose={toggleEventForm} />
            )}
            <button  className='action-buttons' onClick={toggleEventList}>
              {showAllEvents ? 'Hide Events' : 'Saved events'}
            </button>
          </div>
          <div className='event-list-container'>
            {showAllEvents ? (
              events.map((event) => (
                <EventContainer
                  key={event.event_id}
                  event={event}
                  showDeleteButton={true} 
                  showEditButton={true}
                  onClose={toggleEventList}
                />
              ))
            ) : null}
          </div>
        </div>
    </div>
  );
}

export default UserProfile;