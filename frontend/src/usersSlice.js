import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await api.get('/users/users_list/');
    const usersData = response.data;
    return usersData;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {});
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;
