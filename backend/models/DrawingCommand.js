const mongoose = require('mongoose');

const DrawingCommandSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['stroke', 'clear'], // defines the command type
    required: true
  },
  data: {
    type: Object,              // stroke data like path, color, width
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DrawingCommand', DrawingCommandSchema);
