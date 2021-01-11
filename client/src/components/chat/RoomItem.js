import React from 'react';
import { Link } from 'react-router-dom';
function RoomItem({ no, roomId, title }) {
  return (
    <div className="flex items-center  my-1 border rounded">
      <span className="px-4 border-r-2 border-purple-400">{no}</span>
      <h4 className="flex-auto pl-2">{title}</h4>
      <Link
        to={`/chat/${roomId}`}
        className="py-2 px-4 bg-blue-600 text-white font-bold"
      >
        Join
      </Link>
    </div>
  );
}

export default RoomItem;
