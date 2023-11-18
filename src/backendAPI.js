import axios from 'axios';

export function getEvents() {
    return axios.get(`https://icy-surf-5897.fly.dev/events`)
        .then((response) => {
            if (Array.isArray(response.data)) {
                return response.data.map((event) => {
                    return {
                        "event_id": event.event_id,
                        "title": event.title,
                        "event_type": event.event_type,
                        "location": event.location,
                        "date": event.date,
                        "description": event.description,
                        "file_data": event.file_data,
                    };
                });
            } else {
                throw new Error("API response is not an array of events");
            }
        })
        .catch((error) => {
            console.log("Oh noo :O!", error);
            throw error;
        });
};