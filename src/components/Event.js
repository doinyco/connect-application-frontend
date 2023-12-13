import './Event.css';
import React from 'react';
import PropTypes from 'prop-types';
import { deleteEvent } from '../backendAPI';
import EditEventForm from './EditEventForm';
import { useState, useEffect } from 'react';

const Event = (props) => {
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [editEventData, setEditEventData] = useState({});

    const base64ToDataURL = (base64) => {
        return `data:image/jpeg;base64,${base64}`;
    };

    const deleteButton = async () => {
        if (props.showDeleteButton) {
          try {
            await deleteEvent(props.event_id);
            console.log(`Event with ID ${props.event_id} deleted successfully.`);
            } catch (error) {
            console.error(`Error deleting event with ID ${props.event_id}`, error);
            }
        }
    };

    const editButton = () => {
        setEditEventData({
            event_id: props.event_id,
            title: props.title,
            event_type: props.event_type,
            location: props.location,
            date: props.date,
            description: props.description,
            file_data: props.file_data,
        });
        setIsEditFormVisible(!isEditFormVisible);
    };

    useEffect(() => {
    console.log("Edit Event Data:", editEventData);
    }, [editEventData]);

    return (
        <div className="event">
            <h2>
                Title: {props.title},
                EventType: {props.event_type},
                Location: {props.location},
                Date: {props.date},
                Description: {props.description}
            </h2>
            {props.file_data && (
                <div>
                    <img src={base64ToDataURL(props.file_data)} alt="Event Image" />
                </div>
            )}
            {props.showDeleteButton && <button onClick={deleteButton}>Delete Event</button>}
            <button onClick={editButton}>Edit Event</button>
            {props.showEditButton && <button onClick={editButton}>Edit Event</button>}
            {isEditFormVisible && <EditEventForm editEventData={editEventData} />}
        </div>
    )
};

Event.propTypes = {
    showDeleteButton: PropTypes.bool,
    showEditButton: PropTypes.bool,
    event_id:PropTypes.number.isRequired,
    title:PropTypes.string.isRequired,
    event_type:PropTypes.string.isRequired,
    location:PropTypes.string.isRequired,
    date:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    user_id:PropTypes.number.isRequired,
    file_data:PropTypes.string.isRequired
}

export default Event;