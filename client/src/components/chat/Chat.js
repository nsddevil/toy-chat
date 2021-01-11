import React, { useState } from 'react';

function Chat({ chats, users, user, room, onLeaveRoom, onAddChat }) {
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddChat(text);
    setText('');
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4 flex justify-between items-center">
        <h1 className="flex-1 p-2 bg-purple-600 text-white text-center">
          {room ? room.title : '알수없음'}
        </h1>
        <button className="p-2 bg-red-500 text-white" onClick={onLeaveRoom}>
          나가기
        </button>
      </div>
      <div className="mt-4 flex">
        <div className="w-1/4 border">
          {users?.map((user) => (
            <div key={user.user._id} className="flex">
              <span className="mx-2">🙅</span>
              <p>{user.user.name}</p>
            </div>
          ))}
        </div>
        <div style={{ minHeight: '400px' }} className="border w-full ml-2">
          {chats?.map((chat, i) => (
            <div key={i} className="flex">
              <span
                className={
                  chat.user.name === 'system'
                    ? 'mr-2 text-red-400 font-bold'
                    : chat.user.name === user.name
                    ? 'mr-2 text-blue-600 font-bold'
                    : 'mr-2 text-black font-bold'
                }
              >
                {chat.user.name}
              </span>
              <p>{chat.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <form className="flex" onSubmit={onSubmit}>
          <input
            className="pl-2 flex-1 border"
            placeholder="send message.."
            value={text}
            onChange={onChange}
          />
          <button className="p-2 bg-blue-600 text-white">전송</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
