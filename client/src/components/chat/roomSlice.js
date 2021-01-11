import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  rooms: [],
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom: (state, action) => {
      state.rooms = action.payload.rooms;
    },
  },
});

export const { updateRoom } = roomSlice.actions;

export default roomSlice.reducer;
