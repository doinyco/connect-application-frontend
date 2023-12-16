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
  const [updateMessage, setUpdateMessage] = useState(null);

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

    if (title.trim() !== "") {
      formData.append('title', title);
    }
    if (event_type.trim() !== "") {
      formData.append('event_type', event_type);
    }
    if (location.trim() !== "") {
      formData.append('location', location);
    }
    if (date.trim() !== "") {
      formData.append('date', date);
    }
    if (description.trim() !== "") {
      formData.append('description', description);
    }
    if (file_data) {
      formData.append('file', file_data);
    }
  
    if (formData.entries().next().done) {
      setUpdateMessage('Please enter at least one input field to modify the event.');
      return;
    }
  
    try {
      const response = await editEvent(editEventData.event_id, formData);
      console.log('Event successfully edited.', response.data);
      setUpdateMessage('Event successfully updated.');
    } catch (error) {
      console.error('Error while editing event:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      setUpdateMessage('Error editing event. Please try again.');
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
      {updateMessage && <p>{updateMessage}</p>}
    </div>
  );
};

export default EditEventForm;