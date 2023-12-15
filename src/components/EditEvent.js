import "./EditEvent.css";
import React, { useState, useEffect } from "react";
import { editEvent, deleteEvent } from '../backendAPI';
import EditEventForm from "./EditEventForm.js";

const EventContainer = ({ event, showDeleteButton, showEditButton }) => {
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [editEventData, setEditEventData] = useState({});
  
    const base64ToDataURL = (base64) => {
      return `data:image/jpeg;base64,${base64}`;
    };
  
    const deleteButton = async () => {
      if (showDeleteButton) {
        try {
          await deleteEvent(event.event_id);
          console.log(`Event with ID ${event.event_id} deleted successfully.`);
        } catch (error) {
          console.error(`Error deleting event with ID ${event.event_id}`, error);
        }
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
  
    useEffect(() => {
    }, [editEventData]);
  
    return (
      <div className="event">
        <h2>
          Title: {event.title},
          EventType: {event.event_type},
          Location: {event.location},
          Date: {event.date},
          Description: {event.description}
        </h2>
        {event.file_data && (
          <div>
            <img src={base64ToDataURL(event.file_data)} alt="Event Image" />
          </div>
        )}
        <button onClick={deleteButton} >
          Delete Event
        </button>
        <button onClick={editButton} >
          Edit Event
        </button>
        {isEditFormVisible && <EditEventForm editEventData={editEventData} />}
      </div>
    );
  };
  
  export default EventContainer;