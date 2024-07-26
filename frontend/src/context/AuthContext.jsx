import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from '../utils/decodeToken'; // Assuming you have a decodeToken utility
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from '../api';
import {useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState();
//  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? decodeToken(localStorage.getItem('authTokens')).access : null);
  const [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      
      const res = await api.post("/users/login/", { username, password });
      if (res.data) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setAuthTokens(res.data)
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const registerUser = async (username, email, password, userType) => {
    try {
      const res = await api.post('/users/register/', { username, email, password, user_type: userType });
      if (res.data) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setAuthTokens(res.data)
        console.log("Registered!!")
        console.log(res.data)
        
      }
    } 
    catch (error) {
      console.error('Registration failed:', error);
      
    }
  };


  const fetchUserDetails = async () => {
    if (authTokens) {
      try {
        const response = await api.get('/users/profile/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`
          }
        });
        console.log("User: ", response);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));

      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
  };

  
  useEffect(() => {
    if (authTokens) {
      setUser(decodeToken(authTokens.access));
      fetchUserDetails();
    }
  }, [authTokens]);

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after logout
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    fetchUserDetails,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
