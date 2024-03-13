import "./EditEvent.css";
import React, { useState, useEffect } from "react";
import { editEvent, deleteEvent } from '../backendAPI';
import EditEventForm from "./EditEventForm.js";

const EventContainer = ({ event, onClose }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editEventData, setEditEventData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const base64ToDataURL = (base64) => {
    return `data:image/jpeg;base64,${base64}`;
  };

  const deleteButton = async () => {
      try {
        await deleteEvent(event.event_id);
        console.log(`Event with ID ${event.event_id} deleted successfully.`);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          onClose();
        }, 4000);
      } catch (error) {
        console.error(`Error deleting event with ID ${event.event_id}`, error);
      }
  };

  const editButton = () => {
    setEditEventData({
      event_id: event.event_id,
      title: event.title,
      event_type: event.event_type,
      location: event.location,
      date: event.date,
      description: event.description,
      file_data: event.file_data,
    });
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleEditFormClose = () => {
    setIsEditFormVisible(false);
  };

  useEffect(() => {
  }, [editEventData]);

  return (
    <div className="event-container2">
      <div className="event">
        <div className='file-input'>
          {event.file_data && (
            <img src={base64ToDataURL(event.file_data)} alt="Event Image" />
          )}
        </div>
        <div className='title'>{event.title}</div>
        <div className='event-type'>Event type: {event.event_type}</div>
        <div className='location'>Location: {event.location}</div>
        <div className='date'>Date: {event.date}</div>
        <div className='description'>{event.description}</div>
        <div className="buttons">
          <button onClick={deleteButton} >
            Delete Event
          </button>
          <button onClick={editButton} >
            Edit Event
          </button>
        </div>
        {isEditFormVisible && 
          <EditEventForm 
            editEventData={editEventData} 
            setEditEventData={setEditEventData} 
            onClose={handleEditFormClose}/>}
        {showSuccessMessage && (
        <div>
          <p>Event successfully deleted!</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default EventContainer;