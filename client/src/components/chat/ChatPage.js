import React, { useEffect } from 'react';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { socketEmit, socketOn } from '../../store/middleware';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addChat, resetChat, roomInfo, roomUsers } from './chatSlice';

function ChatPage() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { chats, users, room } = useSelector((state) => state.chat);

  const onAddChat = (text) => {
    const newText = {
      roomId,
      user,
      text,
    };
    dispatch(socketEmit('send message', newText));
  };

  const onLeaveRoom = () => {
    history.push('/chat');
  };

  useEffect(() => {
    if (user) {
      dispatch(socketOn('room info', roomInfo()));
      dispatch(socketOn('room users', roomUsers()));
      dispatch(socketOn('message', addChat()));
      dispatch(socketEmit('join room', { roomId, user }));
    }
    return () => dispatch(resetChat());
  }, [dispatch, roomId, user]);

  return (
    <Chat
      chats={chats}
      user={user}
      users={users}
      room={room}
      onLeaveRoom={onLeaveRoom}
      onAddChat={onAddChat}
    />
  );
}

export default ChatPage;
