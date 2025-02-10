// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   bio: { type: String, default: "" },
//   profilePicture: { type: String, default: "" },
//   chatSettings: {
//     theme: { type: String, default: "light" },
//     notifications: { type: Boolean, default: true },
//   },
// });

// const User = mongoose.model("User", UserSchema);
// module.exports = User;


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  chatSettings: {
    theme: { type: String, default: "light" },
    notifications: { type: Boolean, default: true },
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
