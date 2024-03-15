import './Event.css';
import React from 'react';
import PropTypes from 'prop-types';

const Event = (props) => {
    const base64ToDataURL = (base64) => {
        return `data:image/jpeg;base64,${base64}`;
    };

    return (
        <div className="event-container">
            {props.file_data && (
                <div>
                    <img src={base64ToDataURL(props.file_data)} alt="Event Image" />
                </div>
            )}
            <div className='title'>{props.title}</div>
            <div className='event-type'>Event type: {props.event_type}</div>
            <div className='location'>Location: {props.location}</div>
            <div className='date'>Date: {props.date}</div>
            <div className='description'>{props.description}</div>
        </div>
    )
};

Event.propTypes = { 
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