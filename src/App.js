import './App.css';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { getEvents } from './backendAPI';
import EventList from './components/EventList';

const NavUnlisted = styled.ul`
  text-decoration: none;
  position: absolute;
  top: 20px;
  right: 40px;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;  
  color: white;
  margin: 0 10px;
  font-weight: bold;
  font-size: 13.5px;
  &:hover {
    color: #fff;
  }
`

const App = () => {
  const [events, setEvents] = useState([]);
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
        <h1>Connect</h1>
      </header>
      <NavUnlisted>
        <div className="nav-i">
          <StyledLink className="link" to="/register">Create account</StyledLink>
        </div>
        <div className="nav-i">
          <StyledLink className="link" to="/login">Login</StyledLink>
        </div>  
      </NavUnlisted>
      <EventList events={events} />
    </div>
  );
}

export default App;