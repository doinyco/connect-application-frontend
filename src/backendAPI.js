import axios from 'axios';

export function getEvents() {
    return axios.get(`http://127.0.0.1:5000/events`)
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

export function getUserEvents(user_id) {
    const AccessToken = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      withCredentials: true
    };
  
    return axios
      .get(`http://127.0.0.1:5000/users/${user_id}/events`, config)
      .then((response) => {
        if (response.data && response.data.events && Array.isArray(response.data.events)) {
          return response.data.events.map((event) => {
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
          throw new Error("API response does not contain the expected events array");
        }
      })
      .catch((error) => {
        console.log("Error fetching events:", error);
        throw error;
      });
}

export function deleteEvent(event_id) {
    axios.delete(`http://127.0.0.1:5000/events/${event_id}`)
    .then(response => {
        console.log("Event successfully deleted.", response.data);
    })
    .catch((error) => {
        console.log("Delete event axios error:", error);
    });
}

export function editEvent(event_id, eventData) {
  axios.put(`http://127.0.0.1:5000/events/${event_id}`, eventData)
  .then((response) => {
    console.log("Event successfully updated", response.data);
  })
  .catch((error) => {
    console.log("Couldn't edit event", error);
  });
}

export async function editUser(user_id, userData) {
  try {
      const AccessToken = localStorage.getItem('accessToken');
      const config = {
          headers: {
              Authorization: `Bearer ${AccessToken}`,
          },
          withCredentials: true
      };
      
      const response = await axios.put(`http://127.0.0.1:5000/users/${user_id}`, userData, config);
      console.log("User successfully updated", response.data);
  } catch (error) {
      console.log("Couldn't edit user", error);
      throw error;
  }
};

export function deleteUserProfile(user_id) {
  const AccessToken = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      withCredentials: true
    };
  axios.delete(`http://127.0.0.1:5000/users/${user_id}`, config)
  .then(response => {
      console.log("User successfully deleted.", response.data);
  })
  .catch((error) => {
      console.log("Delete user axios error:", error);
  });
}