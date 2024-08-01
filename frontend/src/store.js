import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import coursesReducer from './coursesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    courses: coursesReducer,
  },
});

export default store;
