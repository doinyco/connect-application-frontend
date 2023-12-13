import "./EditEventForm.css";
import React, { useState } from "react";
import { editEvent } from '../backendAPI';

const EditEventForm = ({ editEventData }) => {
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
  
      if (!editEventData || !editEventData.event_id) {
          console.error('Event data or event_id is undefined.');
          return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('event_type', event_type);
      formData.append('location', location);
      formData.append('date', date);
      formData.append('description', description);
      formData.append('file', file_data);
    
      try {
        const response = await editEvent(editEventData.event_id, formData);
        console.log('Event successfully edited.', response.data);
      } catch (error) {
        console.error('Error while editing event:', error);
      if (error.response) {
          console.error('Response data:', error.response.data);
          }
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
          <input type="submit" value="Edit Event:" />
        </form>
      </div>
    );
};

export default EditEventForm;