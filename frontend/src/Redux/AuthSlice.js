import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Retrieve token from localStorage initially
const initialState = {
  message: "",
  user: "",
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
};

const baseUrl = process.env.REACT_APP_BASE_URL;

export const signUpUser = createAsyncThunk('user/signUpUser', async (body, thunkAPI) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/signup`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (body, thunkAPI) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { token, user, message } = action.payload;
        state.token = token;
        state.user = user;
        state.message = message;
        state.error = null;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { token, user, message } = action.payload;
        state.token = token;
        state.user = user;
        state.message = message;
        state.error = null;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
