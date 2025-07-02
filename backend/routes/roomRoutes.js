const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { getDrawingData } = require('../controller/roomController');

// @route   POST /api/rooms/join
// @desc    Join a room (or create if not exist)
// @body    { roomId }
router.post('/join', async (req, res) => {
  const { roomId } = req.body;

  try {
    if (!roomId || roomId.length < 6 || roomId.length > 8) {
      return res.status(400).json({ message: 'Invalid roomId. Must be 6-8 alphanumeric characters.' });
    }

    let room = await Room.findOne({ roomId });

    if (!room) {
      room = new Room({ roomId });
      await room.save();
    }

    res.status(200).json({ roomId: room.roomId });
  } catch (error) {
    console.error('Error joining room:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/rooms/:roomId
// @desc    Get room info (metadata)
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({
      roomId: room.roomId,
      createdAt: room.createdAt,
      lastActivity: room.lastActivity
    });
  } catch (error) {
    console.error('Error getting room info:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// (Optional) Get drawing data from roomController
router.get('/:roomId/drawing', getDrawingData);  // if you're keeping this here

module.exports = router;
