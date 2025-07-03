import React, { useEffect, useRef, useState } from 'react';
import socket from '../socket';
import { v4 as uuidv4 } from 'uuid';

const colors = ['red', 'blue', 'green', 'orange', 'purple'];

const UserCursors = ({ roomId }) => {
  const [cursors, setCursors] = useState({});
  const userIdRef = useRef(uuidv4());

  useEffect(() => {
    const handleMouseMove = (e) => {
      socket.emit('cursor-move', {
        roomId,
        x: e.clientX,
        y: e.clientY,
        userId: userIdRef.current
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    socket.on('cursor-update', ({ x, y, userId }) => {
      setCursors((prev) => ({ ...prev, [userId]: { x, y } }));
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      socket.off('cursor-update');
    };
  }, [roomId]);

  return (
    <>
      {Object.entries(cursors).map(([id, { x, y }], i) => (
        <div key={id} className="absolute w-3 h-3 rounded-full pointer-events-none z-50"
          style={{ left: x, top: y, backgroundColor: colors[i % colors.length], transform: 'translate(-50%, -50%)' }}
        />
      ))}
    </>
  );
};

export default UserCursors;