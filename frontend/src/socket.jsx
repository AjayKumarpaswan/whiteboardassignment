import { io } from "socket.io-client";

const socket = io("https://whiteboardassignment.onrender.com", {
  transports: ["websocket"],
  withCredentials: true
});

export default socket;
