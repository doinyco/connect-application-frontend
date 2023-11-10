import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile";
import CreateProfile from './components/RegisterForm';

const root = ReactDOM.createRoot(document.getElementById('root'));

export function getGlobalUsername() {
  let user_string = localStorage.getItem("user")
  if (user_string === null) {
    return {user_id: -1, username: ""};
  }
  return JSON.parse(user_string)
}

export function setGlobalUsername(username) {
  localStorage.setItem("user", JSON.stringify(username));
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="register" element={<CreateProfile />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="profile/:username" element={<UserProfile />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
