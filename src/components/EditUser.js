import "./EditUser.css";
import React, { useState, useEffect } from "react";
import EditUserForm from "./EditUserForm.js";
import { deleteUserProfile } from '../backendAPI';
import { useNavigate } from "react-router-dom";

const EditUser = ({ user }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const navigate = useNavigate()

  const deleteButton = async () => {
      try {
        await deleteUserProfile(user.user_id);
        console.log(`User with ID ${user.user_id} deleted successfully.`);
        navigate("/register");
      } catch (error) {
        console.error(`Error deleting user with ID ${user.user_id}`, error);
      }
  };

  const editButton = () => {
    setEditUserData({
      user_id: user?.user_id,
      username: user?.username,
      email: user?.email,
      password: user?.password
    });
    setIsEditFormVisible(!isEditFormVisible);
  };

  useEffect(() => {
  }, [editUserData]);

  return (
    <div className="event">
      <h2>
          Username: {user?.username},
          Email: {user?.email},
          Password: {user?.password},
      </h2>
      <button onClick={deleteButton} >
        Delete Profile
      </button>
      <button onClick={editButton} >
        Edit User Profile
      </button>
      {isEditFormVisible && 
          <EditUserForm
              editUserData={editUserData}
              setEditUserData={setEditUserData}
          />
      }
    </div>
  );
};
  
export default EditUser;