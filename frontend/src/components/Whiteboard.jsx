import React, { useState, useEffect } from 'react';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';
import UserCursors from './UserCursors';
import socket from '../socket';

const Whiteboard = ({ roomId, setRoomId }) => {
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    if (roomId) {
      socket.emit('join-room', { roomId });
      console.log('📡 Joined room via socket:', roomId);
    }
  }, [roomId]);

  const handleLeaveRoom = () => {
    socket.emit('leave-room', { roomId });
    setRoomId(null); // go back to RoomJoin
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Back Button */}
      <button
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md z-20"
        onClick={handleLeaveRoom}
      >
        🔙 Leave Room
      </button>

      <Toolbar roomId={roomId} setColor={setColor} setLineWidth={setLineWidth} />
      <DrawingCanvas roomId={roomId} color={color} lineWidth={lineWidth} />
      <UserCursors roomId={roomId} />
    </div>
  );
};

export default Whiteboard;
