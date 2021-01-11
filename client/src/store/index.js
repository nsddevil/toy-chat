import { configureStore, combineReducers } from '@reduxjs/toolkit';
import socketMiddleware from './middleware';
import authReducer from '../components/auth/authSlice';
import roomReducer from '../components/chat/roomSlice';
import chatReducer from '../components/chat/chatSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  room: roomReducer,
  chat: chatReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
