const users = [];

const getUsersInRoomId = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

const setUser = (id, roomId, user) => {
  const newUser = { id, roomId, user };
  users.push(newUser);
  return newUser;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  getUsersInRoomId,
  setUser,
  removeUser,
};
