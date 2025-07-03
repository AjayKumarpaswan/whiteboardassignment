import React from 'react';
import socket from '../socket';

const Toolbar = ({ roomId, setColor, setLineWidth }) => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4">
      <select
        className="border p-1 rounded"
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
      </select>

      <input
        type="range"
        min="1"
        max="10"
        defaultValue="2"
        onChange={(e) => setLineWidth(parseInt(e.target.value))}
      />

      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => {
          console.log('🧼 Emitting clear-canvas:', roomId);
          socket.emit('clear-canvas', { roomId });
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Toolbar;
