import { io } from "socket.io-client";

const socket = io("https://whiteboardassignment.vercel.app/", {
  transports: ["websocket"],
  withCredentials: true
});

export default socket;
