import React, { useEffect } from 'react';
import RoomList from './RoomList';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoom } from './roomSlice';
import { socketConnect, socketEmit, socketOn } from '../../store/middleware';

function RoomPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.room);
  const onAddRoom = (title) => {
    const newRoom = {
      owner: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      title,
    };
    dispatch(socketEmit('add chatroom', newRoom));
  };

  useEffect(() => {
    if (user) {
      dispatch(socketConnect());
      dispatch(socketOn('update roomlist', updateRoom()));
    }
  }, [dispatch, user]);

  return <RoomList onAddRoom={onAddRoom} rooms={rooms} />;
}

export default RoomPage;
