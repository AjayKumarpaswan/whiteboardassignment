const mongoose = require('mongoose');
const DrawingCommandSchema = require('./DrawingCommand').schema;

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  drawingData: [DrawingCommandSchema]  // embedded drawing command schema
});

module.exports = mongoose.model('Room', RoomSchema);
