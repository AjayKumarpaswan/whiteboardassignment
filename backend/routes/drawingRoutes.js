const express = require('express');
const router = express.Router();

const {
  saveStroke,
  clearCanvas,
  getDrawingData
} = require('../controller/drawingController');

// @route   POST /api/drawing/stroke
// @desc    Save a stroke to a room
// @body    { roomId, strokeData }
router.post('/stroke', saveStroke);

// @route   POST /api/drawing/clear
// @desc    Clear the canvas (adds 'clear' command)
// @body    { roomId }
router.post('/clear', clearCanvas);

// @route   GET /api/drawing/:roomId
// @desc    Get all drawing commands (for replay)
router.get('/:roomId', getDrawingData);

module.exports = router;
