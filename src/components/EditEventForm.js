import "./EditEventForm.css";
import React, { useState } from "react";
import { editEvent } from '../backendAPI';

const EditEventForm = ({ editEventData, setEditEventData, onClose }) => {
  const [title, setTitle] = useState('');
  const [event_type, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [file_data, setFileData] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({ status: null, message: "" });

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
      setUpdateStatus({ status: "error", message: "Please enter at least one input field to modify the event." });
      return;
    }
  
    try {
      const response = await editEvent(editEventData.event_id, formData);
      setUpdateStatus({ status: "success", message: "Event updated successfully." });
      setEditEventData({});
      setTimeout(() => {
        console.log(updateStatus); 
        onEditSuccess();
        onClose();
      }, 4000);
    } catch (error) {
      console.error('Error while editing event:', error);
      if (error.response.status === 400) {
        {
          setUpdateStatus({ status: "error", message: "Error while editing event. Please try again." });
        }
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
          <input
            type="file"
            id="file_data"
            name="file_data"
            onChange={handleFileInputChange}
          />
        </div>
        <input type="submit" value="Submit" />
        <button type="button" onClick={onClose}>
            Close form
          </button>
      </form>
      
      {updateStatus.status === "success" && (
      <div>
        <p>{updateStatus.message}</p>
      </div>
    )}
      {updateStatus.status === "error" && <p>{updateStatus.message}</p>}
    </div>
  );
};

export default EditEventForm;