import React, { useContext,useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';


function Logout() {
  const navigate = useNavigate();
  const {user,setUser} = useContext(AuthContext)
  useEffect(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null)
    navigate('/login');
  }, [navigate]);

  return null;
}

export default Logout;
