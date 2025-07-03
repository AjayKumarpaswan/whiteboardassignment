import React, { useState } from 'react';
import RoomJoin from './components/RoomJoin';
import Whiteboard from './components/Whiteboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [roomId, setRoomId] = useState(null);

  return (
    <div className="w-screen h-screen">
      {!roomId ? (
        <RoomJoin setRoomId={setRoomId} />
      ) : (
        <Whiteboard roomId={roomId} setRoomId={setRoomId} />

      )}
      
      {/* ✅ Toast container to show notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
