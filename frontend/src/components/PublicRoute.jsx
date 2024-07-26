import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    // If user is logged in, redirect to the appropriate page
    return user.user_type === 'admin' ? <Navigate to="/admin_dashboard" /> : <Navigate to="/" />;
  }

  // If user is not logged in, render the children components
  return children;
};

export default PublicRoute;
