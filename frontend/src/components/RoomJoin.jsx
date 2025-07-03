import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomJoin = ({ setRoomId }) => {
  const [input, setInput] = useState('');

  const joinRoom = async () => {
    if (!input) {
      toast.error("❗ Please enter a room code");
      return;
    }

    try {
      toast.info("🖌️ Joining room... loading whiteboard");
      const res = await axios.post('http://localhost:3000/api/rooms/join', { roomId: input });
      setRoomId(res.data.roomId);
      toast.success("✅ Joined room successfully!");
    } catch (err) {
      toast.error("❌ Error joining room");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Join a Room</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Room Code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={joinRoom}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;
