import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (user.user_type !== 'admin') {
    // If user is logged in but not an admin, redirect to the home page
    return <Navigate to="/" />;
  }

  // If user is an admin, render the children components
  return children;
};

export default AdminRoute;
