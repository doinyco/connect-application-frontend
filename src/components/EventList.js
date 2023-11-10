import './EventList.css';
import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';

const EventList = (props) => {
    console.log('Received events:', props.events);
    const events = props.events.map((event) => {
        return <div className="events">
            <Event
                key = {event.event_id}
                event_id = {event.event_id}
                title = {event.title}
                event_type = {event.event_type}
                location = {event.location}
                date = {event.date}
                description = {event.description}
                file_data = {event.file_data}
            />
        </div>
    });

    return (
        <div className='event'>
            {events}
        </div>
    );
};

EventList.propType = {
    events:PropTypes.array.isRequired
}

export default EventList;