import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Phone,
  Mail,
  FacebookIcon,
  Linkedin,
} from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ username: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send("service_id", "template_id", form, "service_id");
      await fetch("http://localhost:5000/api/users/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      alert("Message sent successfully!");
      setForm({ username: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#6366F1] dark:bg-gray-900 p-4 lg:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-lg">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* left */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#6366F1] dark:text-white">
                Get in Touch
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                We are here for you! How can we help?
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="username"
                type="text"
                placeholder="Your Name"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-4"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-4"
                required
              />
              <textarea
                name="message"
                placeholder="Go ahead, we are listening..."
                value={form.message}
                onChange={handleChange}
                className="w-full min-h-[150px] rounded-xl border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 p-4"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#6366F1] dark:bg-[#4F51C5] p-4 text-lg font-semibold text-white hover:bg-[#5457E5] dark:hover:bg-[#4345B0]"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
          {/* right */}
          <div className="flex flex-col justify-center space-y-8 lg:pl-8">
            <div className="space-y-6">
              {[
                { icon: MapPin, text: "674 Washington Avenue" },
                { icon: Phone, text: "602-216-4143" },
                { icon: Mail, text: "johndoe123@gmail.com" },
              ].map(({ icon: Icon, text }, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 text-gray-600 dark:text-gray-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6366F1]/10 dark:bg-gray-700">
                    <Icon className="h-5 w-5 text-[#6366F1] dark:text-white" />
                  </div>
                  <span className="text-lg">{text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href=""
                className="h-12 w-12 rounded-full border border-[#6366F1] dark:border-gray-600 text-[#6366F1] dark:text-gray-100 hover:bg-[#6366F1] dark:hover:bg-gray-600 hover:text-white flex items-center justify-center"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>

              <a
                href=""
                className="h-12 w-12 rounded-full border border-[#6366F1] dark:border-gray-600 text-[#6366F1] dark:text-gray-100 hover:bg-[#6366F1] dark:hover:bg-gray-600 hover:text-white flex items-center justify-center"
              >
                <BsTwitterX className="h-5 w-5" />
              </a>

              <a
                href=""
                className="h-12 w-12 rounded-full border border-[#6366F1] dark:border-gray-600 text-[#6366F1] dark:text-gray-100 hover:bg-[#6366F1] dark:hover:bg-gray-600 hover:text-white flex items-center justify-center"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
