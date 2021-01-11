import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  chats: [],
  room: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    resetChat: (state, action) => {
      state.chats = [];
    },
    roomInfo: (state, action) => {
      state.room = action.payload.room;
    },
    roomUsers: (state, action) => {
      state.users = action.payload.users;
    },
  },
});

export const { addChat, resetChat, roomInfo, roomUsers } = chatSlice.actions;

export default chatSlice.reducer;
