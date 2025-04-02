import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://ai-x553.onrender.com/login';

// Action to login and save the token in the store
export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, userData);
    // Return the token data to store it in the Redux store
    return { token: response.data.token };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:  null,  // Get token from localStorage if it exists
    status: 'idle',  // To track the status of the login request
    error: null,  // To track any errors
  },
  reducers: {
    logout: (state) => {
      // Remove the token from localStorage and reset the token state
      localStorage.removeItem('token');
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Save the token to both Redux store and localStorage
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to login';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
