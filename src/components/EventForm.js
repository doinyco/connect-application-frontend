import "./EventForm.css";
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
      `http://127.0.0.1:5000/events/create_event`,
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

const EventForm = ({ userData, onClose }) => {
  const [title, setTitle] = useState('');
  const [event_type, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [file_data, setFileData] = useState(null);
  const [isFileMissing, setFileMissing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

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
    setFileMissing(false);
  };
  
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    if (!file_data) {
      setFileMissing(true);
      return;
    }

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
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 4900);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  const handleCloseForm = () => {
    onClose();
    setIsModalOpen(false);
  };
  
  return (
      <div className={`modal-overlay ${isModalOpen ? 'modal-open' : ''}`}>
        <form className='event-form' onSubmit={handleFormSubmission}>
          <div className="event-input">
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
            <input
              type="file"
              id="file_data"
              name="file_data"
              onChange={handleFileInputChange}
            />
            {isFileMissing && <p>Please upload a file</p>}
          </div>
          <input className='submit-button' type="submit" value="Submit" />
          <button type="close-button" onClick={handleCloseForm}>Close Form</button>
        </form>
        <div className='status-message'>
          {showSuccessMessage && (
              <p>Event created successfully!</p>
          )}
        </div>
      </div>
    
  );
};
  
export default EventForm;