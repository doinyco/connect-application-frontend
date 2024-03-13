import React, { useState, useEffect } from "react";
import { editUser, editUserData } from '../backendAPI';
import "./EditUserForm.css";

const EditUserForm = ({ editUserData, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateStatus, setUpdateStatus] = useState({ status: null, message: '' });
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  {/*useEffect(() => {
    setUsername('');
    setEmail('');
    setPassword('');
  }, [editUserData]); */}
   
  const handleUsernameInput = (event) => {
      setUsername(event.target.value);
  };
  const handleEmailInput = (event) => {
      setEmail(event.target.value);
  };
  const handlePasswordInput = (event) => {
      setPassword(event.target.value);
  };
    
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const userDetails = {};

    if (username.trim() !== "") {
      userDetails.username = username;
    }
    if (email.trim() !== "") {
      userDetails.email = email;
    }
    if (password.trim() !== "") {
      userDetails.password = password;
    }

    if (Object.keys(userDetails).length === 0) {
      setUpdateStatus({ status: "error", message: "Please enter at least one input field to modify your personal data." });
      return;
    }

    try {
      const response = await editUser(editUserData.user_id, userDetails);
      console.log(`User with ID ${editUserData.user_id} updated successfully.`, response.data);
      setUpdateStatus({ status: "success", message: "Userdata updated successfully." });
      console.log("Before onClose");
      onClose();
      setIsModalOpen(false);
      console.log("After onClose");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setUpdateStatus({ status: "error", message: error.response.data.error});
        }
      }
    }
  };
  
  return (
    <div className="edit-user">
    <div className={`modal-overlay ${isModalOpen ? 'modal-open' : ''}`}>
      <form  className="edit-user-form" onSubmit={handleFormSubmission}>
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameInput}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailInput}
          />
          <input
            name="password"
            type="text"
            placeholder="Password"
            value={password}
            onChange={handlePasswordInput}
            autoComplete="current-password"
          />
        </div>
        {/*<input type="submit" value="Submit" /> */}
        <div className='submit-button'>
          <input type="submit" value="Submit" />
        </div>
        <button className='close-form' type="button" onClick={onClose}>
            Close form
        </button>
      </form>
      {updateStatus.status === "success" && (
        <p>{updateStatus.message}</p>
      )}
      {updateStatus.status === "error" && 
        <p>{updateStatus.message}</p>
      }
      </div>
    </div>
  );
};
  
export default EditUserForm;