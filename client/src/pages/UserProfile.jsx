import React, { useState, useEffect } from "react";
import axios from "axios";
import profilepic from '../assets/images/profile.jpg'
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const UserProfile = () => {

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
    chatSettings: {
      theme: "light",
      notifications: true,
    },
  });
  const [newBio, setNewBio] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  //const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/users/profile", {
        // headers: {
        //   Authorization: token,
        // },
        withCredentials: true
      })
      .then((res) => {
        setProfile(res.data);
        setNewBio(res.data.bio);
        setTheme(res.data.chatSettings.theme);
        setNotifications(res.data.chatSettings.notifications);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBioChange = (e) => setNewBio(e.target.value);

  const handleProfilePicChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const handleThemeChange = (e) => {
    toggleDarkMode();
    setTheme(darkMode);
  }  

  const handleNotificationsChange = (e) =>
    setNotifications(e.target.checked);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("bio", newBio);
    formData.append("theme", theme);
    formData.append("notifications", notifications);

    if (newProfilePic) {
      formData.append("profilePicture", newProfilePic);
    }

    axios
      .post("/api/users/profile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          //Authorization: token,
        },
        withCredentials: true,
      })
      .then((res) => {
        alert("Profile updated successfully!");
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container p-20 pt-28 mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="flex gap-10">
      <div >
        <img
          src={profile.profilePicture||profilepic}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        </div>
        <div>
        <div className="mt-4">
        <label className="block font-bold">Username:</label>
        <p>{profile.username||"@AstrioidDestroyer"}</p>
      </div>
      <div className="mt-4">
      <input type="file" className="rounded" onChange={handleProfilePicChange} />
      </div>
      </div>
      </div>
      
      <div className="mt-4">
        <label className="block font-bold">Bio:</label>
        <textarea
          value={newBio||"Meowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"}
          onChange={handleBioChange}
          className={`border rounded p-2 w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        />
      </div>
      <div className="mt-4">
        <label className="block font-bold">Chat Theme:</label>
        <select className={`w-24 mt-3 p-1 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`} value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="mt-5">
        <label className="block font-bold">
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsChange}
            className="w-3 h-3"
          />
          <span className="ml-2">Enable Notifications</span>
        </label>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-10"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserProfile;
