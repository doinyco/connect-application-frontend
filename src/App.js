import './App.css';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { getEvents } from './backendAPI';
import EventList from './components/EventList';

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

const App = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.log("Oh noo :O!", error);
    }
  };
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>I am App</h1>
      </header>
      <NavUnlisted>
        <div className="nav-i">
          <StyledLink className="link" to="/register">New User? Sign-up here</StyledLink>
        </div>
        <div className="nav-i">
          <StyledLink className="link" to="/login">Login</StyledLink>
        </div>  
      </NavUnlisted>
      <EventList events={events}/>
    </div>
  );
}

export default App;