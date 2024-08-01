import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// Async thunks
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const response = await api.get('courses/courses_list/');
    return response.data;
});

export const fetchCategories = createAsyncThunk('courses/fetchCategories', async () => {
    const response = await api.get('courses/categories_list/');
    return response.data;
});

// Slice
const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        categories: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default coursesSlice.reducer;
