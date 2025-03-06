// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const upload = require("../middlewares/upload");
// const router = express.Router();

// const authenticateJwt = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// router.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({ username, email, password: hashedPassword });
//   await newUser.save();

//   res.json({ message: "User registered successfully" });
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.status(400).json({ error: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//   res.json({ token });
// });

// router.get("/profile", authenticateJwt, async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   if (!user) return res.status(404).json({ error: "User not found" });

//   res.json(user);
// });

// router.put("/profile", authenticateJwt, async (req, res) => {
//   const { bio, chatSettings } = req.body;

//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     { bio, chatSettings },
//     { new: true }
//   ).select("-password");

//   res.json(updatedUser);
// });

// router.post("/profile/upload", authenticateJwt, upload.single("profilePicture"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     { profilePicture: `/uploads/${req.file.filename}` },
//     { new: true }
//   ).select("-password");

//   res.json(updatedUser);
// });

// module.exports = router;

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import upload from "../middleware/upload.js";

const router = express.Router();

const authenticateJwt = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

router.get("/profile", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

router.put("/profile", authenticateJwt, async (req, res) => {
  const { bio, chatSettings } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { bio, chatSettings },
    { new: true }
  ).select("-password");

  res.json(updatedUser);
});

router.post(
  "/profile/upload",
  authenticateJwt,
  upload.single("profilePicture"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: `/uploads/${req.file.filename}` },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  }
);

router.post("/contact", async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const messageCreate = await Contact.create({ username, email, message });
    messageCreate.save();
    res.json({
      success: true,
      data: messageCreate,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

export default router;
