const Room = require('../models/Room');

// Add a stroke to a room
exports.saveStroke = async (req, res) => {
  const { roomId, strokeData } = req.body;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const command = {
      type: 'stroke',
      data: strokeData,
      timestamp: new Date()
    };

    room.drawingData.push(command);
    room.lastActivity = new Date();
    await room.save();

    res.status(200).json({ message: 'Stroke saved' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Clear canvas (add a 'clear' command)
exports.clearCanvas = async (req, res) => {
  const { roomId } = req.body;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    room.drawingData.push({
      type: 'clear',
      timestamp: new Date()
    });

    room.lastActivity = new Date();
    await room.save();

    res.status(200).json({ message: 'Canvas cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get all drawing data (for replay)
exports.getDrawingData = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.status(200).json({ drawingData: room.drawingData });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
