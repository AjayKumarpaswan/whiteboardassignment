const { addDrawingCommand } = require('../controller/roomController');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    // 1. JOIN ROOM
    socket.on('join-room', ({ roomId }) => {
      socket.join(roomId);
      console.log(`👤 ${socket.id} joined room ${roomId}`);
      socket.to(roomId).emit('user-joined', { socketId: socket.id });

      const userCount = io.sockets.adapter.rooms.get(roomId)?.size || 1;
      io.to(roomId).emit('user-count', userCount);
    });

    // 2. LEAVE ROOM
    socket.on('leave-room', ({ roomId }) => {
      socket.leave(roomId);
      console.log(`👤 ${socket.id} left room ${roomId}`);
      socket.to(roomId).emit('user-left', { socketId: socket.id });

      const userCount = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit('user-count', userCount);
    });

    // 3. CURSOR MOVE
    socket.on('cursor-move', ({ roomId, x, y, userId }) => {
      socket.to(roomId).emit('cursor-update', { x, y, userId });
    });

    // 4. DRAW START
    socket.on('draw-start', (data) => {
      socket.to(data.roomId).emit('draw-start', data);
    });

    // 5. DRAW MOVE
    socket.on('draw-move', (data) => {
      socket.to(data.roomId).emit('draw-move', data);
    });

    // 6. DRAW END + SAVE STROKE
    socket.on('draw-end', async (data) => {
      socket.to(data.roomId).emit('draw-end', data);

      await addDrawingCommand(data.roomId, {
        type: 'stroke',
        data: {
          x0: data.x0,
          y0: data.y0,
          x1: data.x1,
          y1: data.y1,
          color: data.color,
          width: data.width
        }
      });
    });

    // ✅ 7. FIXED: CLEAR CANVAS
    socket.on('clear-canvas', async ({ roomId }) => {
      console.log('🧼 CLEAR CANVAS REQUEST FROM CLIENT:', roomId); // ✅ Debug log
      io.to(roomId).emit('clear-canvas');
    });

    // DISCONNECTING
    socket.on('disconnecting', () => {
      const rooms = [...socket.rooms].filter((r) => r !== socket.id);
      rooms.forEach((roomId) => {
        socket.to(roomId).emit('user-left', { socketId: socket.id });
        const userCount = (io.sockets.adapter.rooms.get(roomId)?.size || 1) - 1;
        io.to(roomId).emit('user-count', userCount);
      });
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;
