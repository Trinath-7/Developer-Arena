import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Advanced Async Authentication Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await api.login(email, password);
      return user;
    } catch (err) {
      return rejectWithValue(err.message || 'Authentication failure');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('mooun_user')) || null,
  isAuthenticated: !!localStorage.getItem('mooun_user'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('mooun_user');
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('mooun_user', JSON.stringify(action.payload));
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, registerSuccess, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
