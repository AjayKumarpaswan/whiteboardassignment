const Room = require('../models/Room');
const mongoose = require('mongoose');

// Add a drawing command (stroke or clear)
exports.addDrawingCommand = async (roomId, commandData) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) throw new Error('Room not found');

    room.drawingData.push({
      type: commandData.type,     // 'stroke' or 'clear'
      data: commandData.data,     // path, color, width, etc.
      timestamp: new Date()
    });

    room.lastActivity = new Date();
    await room.save();
    return true;
  } catch (error) {
    console.error('Error adding drawing command:', error.message);
    return false;
  }
};

// Fetch all drawing commands for a room (optional)
exports.getDrawingData = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: 'Room not found' });

    return res.status(200).json({ drawingData: room.drawingData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
