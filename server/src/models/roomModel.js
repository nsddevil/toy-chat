const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      _id: mongoose.Types.ObjectId,
      name: String,
      email: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
