import { createSlice } from '@reduxjs/toolkit';
import client from '../../api/client';

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth/authSlice',
  initialState,
  reducers: {
    signinStart: (state, action) => {
      state.isLoading = true;
    },
    signinSuccess: (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.user = user;
    },
    signinFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    signupStart: (state, action) => {
      state.isLoading = true;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    getUserStart: (state, action) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.user = user;
    },
    getUserFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    logoutStart: (state, action) => {
      state.isLoading = true;
    },
    logoutSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
  },
});

const {
  signinFailure,
  signinStart,
  signinSuccess,
  signupFailure,
  signupStart,
  signupSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  logoutFailure,
  logoutSuccess,
  logoutStart,
} = authSlice.actions;

export const signup = (form) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const res = await client.post(`/api/user/signup`, form);
    dispatch(signupSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(signupFailure(error.response.data));
  }
};

export const signin = (form) => async (dispatch) => {
  try {
    dispatch(signinStart());
    const res = await client.post(`/api/user/signin`, form);
    localStorage.setItem('toyshop_token', res.data.token);
    dispatch(signinSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(signinFailure(error.response.data));
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const res = await client.get(`/api/user/info`);
    dispatch(getUserSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(getUserFailure(error.response.data));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutStart());
    const res = await client.get('/api/user/logout');
    localStorage.removeItem('toyshop_token');
    dispatch(logoutSuccess(res.data));
    return res;
  } catch (error) {
    console.log(error.response);
    dispatch(logoutFailure(error.response.data));
  }
};

export default authSlice.reducer;
