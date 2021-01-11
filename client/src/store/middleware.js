import { io } from 'socket.io-client';

const SOCKET_CONNECT = 'socket/wsconnect';
const SOCKET_DISCONNECT = 'socket/disconnect';
const SOCKET_EMIT = 'socket/emit';
const SOCKET_ON = 'socket/on';
const SOCKET_HOST = 'http://localhost:4000';

export const socketConnect = (host = SOCKET_HOST) => ({
  type: SOCKET_CONNECT,
  payload: { host },
});

export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
});

export const socketEmit = (event, data) => ({
  type: SOCKET_EMIT,
  payload: {
    event,
    data,
  },
});

export const socketOn = (event, action) => ({
  type: SOCKET_ON,
  payload: {
    event,
    action,
  },
});

const socketMiddleware = () => {
  let socket = null;

  return (store) => (next) => (action) => {
    const { payload } = action;
    switch (action.type) {
      case SOCKET_CONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = io(payload.host);
        console.log('socket connect');
        break;
      case SOCKET_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('socket disConnect');
        break;
      case SOCKET_EMIT:
        socket.emit(payload.event, payload.data || {});
        break;
      case SOCKET_ON:
        socket.on(payload.event, (data) => {
          next({ ...payload.action, payload: data });
        });
        break;
      default:
        next(action);
    }
  };
};

export default socketMiddleware();
