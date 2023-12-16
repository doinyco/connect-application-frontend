import "./RegisterForm.css";
import React, { useState } from "react";
import axios from "axios";

const createEvent = async (eventDetails) => {
    try {
      const formData = new FormData();
  
      Object.keys(eventDetails).forEach((key) => {
        if (key !== 'file_data') {
          formData.append(key, eventDetails[key]);
        }
      });
      formData.append('file', eventDetails.file_data);
  
      const response = await axios.post(
        `https://icy-surf-5897.fly.dev/events/create_event`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Couldn't create event.", error);
      throw error;
    }
};

const EventForm = ({ userData }) => {
    const [title, setTitle] = useState('');
    const [event_type, setEventType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [file_data, setFileData] = useState(null);
  
    const handleTitleInput = (event) => {
      setTitle(event.target.value);
    };
    const handleEventTypeInput = (event) => {
      setEventType(event.target.value);
    };
    const handleLocationInput = (event) => {
      setLocation(event.target.value);
    };
    const handleDateInput = (event) => {
      setDate(event.target.value);
    };
    const handleDescriptionInput = (event) => {
      setDescription(event.target.value);
    };
    const handleFileInputChange = (event) => {
      setFileData(event.target.files[0]);
    };
  
    const handleFormSubmission = async (event) => {
      event.preventDefault();
  
      const eventDetails = {
        title,
        event_type,
        location,
        date,
        description,
        user_id: userData.user_id,
        file_data,
      };
  
      try {
        const createdEvent = await createEvent(eventDetails);
        console.log('Event created successfully:', createdEvent);
      } catch (error) {
        console.error('Error creating event:', error);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleFormSubmission}>
          <div className="log">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleInput}
            />
            <input
              name="event_type"
              type="text"
              placeholder="Event Type"
              value={event_type}
              onChange={handleEventTypeInput}
            />
            <input
              name="location"
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationInput}
            />
            <input
              name="date"
              type="text"
              placeholder="Date"
              value={date}
              onChange={handleDateInput}
            />
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionInput}
            />
            {/* Single file input */}
            <input
              type="file"
              id="file_data"
              name="file_data"
              onChange={handleFileInputChange}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
  
  export default EventForm;