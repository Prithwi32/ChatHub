// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");
// const cors = require("cors");
// const socket = require("socket.io");

// const app = express();
// app.use(express.json());

// // Enable CORS for both frontend apps
// app.use(
//   cors({
//     origin: ["https://chathub-frontend-en5a.onrender.com"],
//     methods: ["GET", "POST"],
//     credentials: true
//   })
// );

// // Serve static uploads
// app.use("/uploads", express.static("uploads"));

// // Routes
// app.use("/api/users", userRoutes);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Start Express Server
// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Setup Socket.io
// const io = socket(server, {
//   cors: {
//     origin: ["https://chathub-frontend-en5a.onrender.com", "https://chatnest-gxu5.onrender.com"],
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // WebSocket Events
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (room) => {
//     socket.join(room);
//     console.log(`User joined room: ${room}`);
//   });

//   socket.on("send_message", (data) => {
//     console.log("Message received:", data);
//     socket.to(data.room).emit("receive_message", data.content);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected");
//   });
// });

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import { Server } from "socket.io";

dotenv.config();
const app = express();
app.use(express.json());

// Enable CORS for both frontend apps
app.use(
  cors({
    origin: [
      "https://chathub-frontend-en5a.onrender.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Serve static uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Express Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: [
      "https://chathub-frontend-en5a.onrender.com",
      "https://chatnest-gxu5.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// WebSocket Events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
