import React, { useRef, useEffect } from 'react';
import socket from '../socket';

const DrawingCanvas = ({ roomId, color, lineWidth }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctxRef.current = ctx;

    // ✅ Listen to remote draw events
    socket.on('draw-start', (data) => {
      ctx.beginPath();
      ctx.moveTo(data.x, data.y);
    });

    socket.on('draw-move', (data) => {
      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.width;
      ctx.lineTo(data.x, data.y);
      ctx.stroke();
    });

    socket.on('clear-canvas', () => {
      console.log('🧽 Received clear-canvas from server');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off('draw-start');
      socket.off('draw-move');
      socket.off('clear-canvas');
    };
  }, []);

  const getMousePos = (e) => {
    return {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseDown = (e) => {
    drawing.current = true;
    const { x, y } = getMousePos(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);

    socket.emit('draw-start', { roomId, x, y });
  };

  const handleMouseMove = (e) => {
    if (!drawing.current) return;
    const { x, y } = getMousePos(e);
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = lineWidth;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();

    socket.emit('draw-move', {
      roomId,
      x,
      y,
      color,
      width: lineWidth,
    });
  };

  const handleMouseUp = () => {
    drawing.current = false;
    socket.emit('draw-end', { roomId });
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default DrawingCanvas;
