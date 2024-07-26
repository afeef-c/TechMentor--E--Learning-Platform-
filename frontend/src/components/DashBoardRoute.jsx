import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DashBoardRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (!['student', 'tutor'].includes(user.user_type)) {
    // If user is logged in but not a student or tutor, redirect to the home page
    return <Navigate to="/" />;
  }

  // If user is a student or tutor, render the children components
  return children;
};

export default DashBoardRoute;
