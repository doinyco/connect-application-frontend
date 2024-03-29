import './EventList.css';
import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';

const EventList = (props) => {
  const events = props.events.map((event) => {
      return (
        <div class="event-list">
            <div key={event.event_id} className="events">
              <Event
                event_id={event.event_id}
                title={event.title}
                event_type={event.event_type}
                location={event.location}
                date={event.date}
                description={event.description}
                file_data={event.file_data}
              />
            </div>
        </div>
          
      );
    }
  );
  return (
      <div className='events'>
          {events}
      </div>
  );
};
  
EventList.propTypes = {
  events: PropTypes.array.isRequired
};
  
export default EventList;