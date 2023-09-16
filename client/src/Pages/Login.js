import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'login') {
        const loginData = {
          email,
          password,
        };

        const response = await axios.post('http://localhost:8800/login', loginData);

        if (response.status === 200) {
          // Handle successful login
          console.log('Logged in successfully');
          setLoggedIn(true); // Set login status to true
          navigate("/home");
        }
      } else {
        const registerData = {
          username,
          email,
          password,
        };

        const response = await axios.post('http://localhost:8800/register', registerData);

        if (response.status === 200) {
          // Handle successful registration
          console.log('Registered successfully');
          setLoggedIn(true); // Set login status to true
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response) {
        // Handle server response errors
        setErrorMessage(error.response.data.message);
      } else {
        // Handle network or unexpected errors
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  // Use the `loggedIn` state to conditionally render a Navigate component
  if (loggedIn) {
    console.log("Logged in status: true"); // Redirect to home page if logged in
  }

  return (
    <div className="login-container">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="submit-button">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="switchRegister">
        {mode === 'login'
          ? "Don't have an account? "
          : 'Already have an account? '}
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setErrorMessage('');
          }}
          className="toggle-button"
        >
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}
