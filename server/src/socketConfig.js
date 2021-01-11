const SocketIO = require('socket.io');
const { setUser, getUsersInRoomId, removeUser } = require('./utils/users');
const Room = require('./models/roomModel');

module.exports = (server) => {
  const io = SocketIO(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', async (socket) => {
    console.log('new socket', socket.id);
    const rooms = await Room.find().exec();
    socket.emit('update roomlist', { rooms });

    socket.on('add chatroom', async (data) => {
      const newRoom = new Room(data);
      await newRoom.save();
      const rooms = await Room.find().exec();

      io.emit('update roomlist', { rooms });
    });

    socket.on('join room', async (data) => {
      socket.join(data.roomId);
      const user = setUser(socket.id, data.roomId, data.user);
      const users = getUsersInRoomId(user.roomId);
      const room = await Room.findOne({ _id: user.roomId });

      io.to(user.roomId).emit('message', {
        user: {
          name: 'system',
        },
        text: `${user.user.name} 님이 입장하셨습니다.`,
      });

      io.to(user.roomId).emit('room info', { room });
      io.to(user.roomId).emit('room users', { users });
    });

    socket.on('send message', (data) => {
      console.log('send message');
      io.to(data.roomId).emit('message', {
        user: data.user,
        text: data.text,
      });
    });

    socket.on('disconnect', async () => {
      console.log('socket disconnect');
      socket.leave();
      const user = removeUser(socket.id);
      const users = getUsersInRoomId(user.roomId);
      io.to(user.roomId).emit('message', {
        user: {
          name: 'system',
        },
        text: `${user.user.name} 님이 나가셨습니다.`,
      });

      if (users.length !== 0) {
        io.to(user.roomId).emit('room users', { users });
      } else {
        try {
          await Room.findOneAndDelete({ _id: user.roomId });
          const rooms = await Room.find().exec();
          io.emit('update roomlist', { rooms });
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
};
