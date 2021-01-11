import React, { useState } from 'react';
import RoomItem from './RoomItem';

function RoomList({ onAddRoom, rooms }) {
  const [title, setTitle] = useState('');
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddRoom(title);
    setTitle('');
  };
  return (
    <div className="container mx-auto">
      <div>
        {rooms?.map((room, i) => (
          <RoomItem
            key={room._id}
            no={i + 1}
            title={room.title}
            roomId={room._id}
          />
        ))}
      </div>
      <div>
        <form className="flex" onSubmit={onSubmit}>
          <input
            className="pl-2 flex-1 border"
            placeholder="방 타이틀"
            value={title}
            onChange={onChange}
          />
          <button className="p-2 bg-blue-600 text-white">방만들기</button>
        </form>
      </div>
    </div>
  );
}

export default RoomList;
