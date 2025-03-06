import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../App";
// Initialize toastify notifications

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
        toast.success("Registration successful!", { position: "top-center" });
        navigate("/login"); // Redirect after signup
      } else {
        setMessage(data.message || "Registration failed.");
        toast.error(data.message || "Registration failed.", {
          position: "top-center",
        });
      }
    } catch (error) {
      setMessage("Server error, please try again.");
      toast.error("Server error, please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#C9E1CD] to-[#4ABEBD]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Sign Up
        </h2>
        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full bg-[#4ABEBD] text-white p-3 rounded-lg hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
