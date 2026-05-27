import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api.js';

function normalizeToken(payload) {
  return payload?.token || payload?.data?.token;
}

function normalizeUser(payload) {
  const user = payload?.user || payload?.data?.user || payload?.data || payload;
  if (!user || typeof user !== 'object') return user;
  const { token, ...rest } = user;
  return rest;
}

function getErrorMessage(payload, fallback) {
  if (!payload) return fallback;
  return payload.message || payload.msg || fallback;
}

function loadSavedUser() {
  try {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    return null;
  }
}

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);

      const token = normalizeToken(response.data);
      const user = normalizeUser(response.data);

      if (token) localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', userData);

      const token = normalizeToken(response.data);
      const user = normalizeUser(response.data);

      if (token) localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {};
});

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put('/auth/change-password', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Change password failed' });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/forgot-password', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Forgot password failed' });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Reset password failed' });
    }
  }
);

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Not authenticated' });
  }
});

const initialState = {
  user: loadSavedUser(),
  token: localStorage.getItem('token') || null,
  isAuthLoading: false,
  isMeLoading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.error = null;

        const payload = action.payload || {};
        const token = normalizeToken(payload);
        const user = normalizeUser(payload);

        if (token) state.token = token;
        state.user = user;
        state.isAuthenticated = Boolean(token || state.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = getErrorMessage(action.payload, 'Registration failed');
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthLoading = false;
        state.error = null;

        const payload = action.payload || {};
        const token = normalizeToken(payload);
        const user = normalizeUser(payload);

        if (token) state.token = token;
        state.user = user;
        state.isAuthenticated = Boolean(token || state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = getErrorMessage(action.payload, 'Login failed');
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isAuthLoading = false;
        state.isMeLoading = false;
        state.error = null;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = getErrorMessage(action.payload, 'Change password failed');
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = getErrorMessage(action.payload, 'Forgot password failed');
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.error = getErrorMessage(action.payload, 'Reset password failed');
      })

      // GetMe
      .addCase(getMe.pending, (state) => {
        state.isMeLoading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isMeLoading = false;

        const payload = action.payload;
        const fetchedUser = normalizeUser(payload);
        state.user = state.user ? { ...state.user, ...fetchedUser } : fetchedUser;
        if (state.user) localStorage.setItem('user', JSON.stringify(state.user));

        state.isAuthenticated = Boolean(state.token || localStorage.getItem('token'));
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isMeLoading = false;
        state.error = getErrorMessage(action.payload, null);

        const currentToken = localStorage.getItem('token');
        if (!currentToken) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

