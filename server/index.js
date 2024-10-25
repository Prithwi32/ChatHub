const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");

app.use(
  cors({
    origin: "https://chatnest-gxu5.onrender.com",
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(express.json());

const server = app.listen("3000", () => {
  console.log("Server is running at port 3000...");
});

const io = socket(server, {
  cors: {
    origin: "https://chatnest-gxu5.onrender.com",
    methods: ["GET", "POST"],
    credentials: true
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content)
  })

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
