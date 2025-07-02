require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const socketHandler = require('./socket/index');
const roomRoutes = require('./routes/roomRoutes');
const drawingRoutes = require('./routes/drawingRoutes');

const app = express();
connectDB();

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Successfully connected to the server");
})


// Mount socket
socketHandler(io);

// Mount API routes
app.use('/api/rooms', roomRoutes);
app.use('/api/drawing', drawingRoutes);


const port=process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});