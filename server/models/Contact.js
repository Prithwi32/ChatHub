import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  username: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
