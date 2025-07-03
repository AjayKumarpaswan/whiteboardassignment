require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const socketHandler = require('./socket/index');
const roomRoutes = require('./routes/roomRoutes');
const drawingRoutes = require('./routes/drawingRoutes');

// ✅ Step 1: Create app FIRST
const app = express();

// ✅ Step 2: Now you can use app to create http server
const httpServer = http.createServer(app);

// ✅ Step 3: Connect to DB
connectDB();

// ✅ Step 4: Setup socket.io
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ✅ Step 5: Apply middlewares and routes
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successfully connected to the server");
});

app.use('/api/rooms', roomRoutes);
app.use('/api/drawing', drawingRoutes);

// ✅ Step 6: Start socket handler
socketHandler(io);

// ✅ Step 7: Start the server
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`✅ Server and socket running on port ${port}`);
});
