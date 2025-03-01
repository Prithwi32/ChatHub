import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Server error, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#C9E1CD] to-[#4ABEBD]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-700 text-center">Login</h2>
        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
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
            Login
          </button>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
