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
  const [theme, setTheme] = useState(darkMode?"dark":"light");
  const [notifications, setNotifications] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

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
    const file = e.target.files[0];
    if(file){
      setNewProfilePic(file);
      setSelectedFile(file.name);
    }
  };

  const handleThemeChange = (e) => {
    //toggleDarkMode();
    setTheme(e.target.value);
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
    <div className="container max-w-2xl p-10 pt-28 mx-auto">
      <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
        User Profile
      </h2>
      <div className={`shadow-xl rounded-2xl p-8 text-center ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-100"}`}>
        <div className="flex flex-col items-center">
          <img
            src={profile.profilePicture || profilepic}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300 shadow-xl"
          />
          <div className="mt-3">
            <label className={`block font-bold ${darkMode ? "text-gray-300" : "text-gray-800"}`}>Username</label>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{profile.username || "@AsteroidDestroyer"}</p>
          </div>
    
          <div className="mt-4 w-full flex flex-col items-center">
            {/* Styled File Input Button */}
            <div className="relative overflow-hidden rounded-full shadow-xl">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfilePicChange}
              />
              <button
                className={`py-2 px-4 rounded-full text-white transition duration-300 
                  ${darkMode ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-blue-500 to-indigo-500"} 
                  shadow-xl hover:opacity-90`}
              >
                {selectedFile ? "File Selected ✅" : "Choose File"}
              </button>
            </div>
          
            {/* Display Selected File Name */}
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-400">{selectedFile}</p>
            )}
          </div>
        </div>
    
        <div className="mt-6">
          <label className={`block font-bold text-left ${darkMode ? "text-gray-300" : "text-gray-800"}`}>Bio:</label>
          <textarea
            value={newBio || "Meowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"}
            onChange={handleBioChange}
            className={`border rounded p-2 w-3/4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-300"}`}
            rows="3"
          />
        </div>
    
        <div className="mt-6">
          <label className={`block font-bold text-left ${darkMode ? "text-gray-300" : "text-gray-800"}`}>Chat Theme:</label>
          <select
            className={`w-32 mt-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </div>
    
        <div className="mt-5">
          <label className={`block font-bold ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationsChange}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>
    
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-full mt-8 hover:from-indigo-500 hover:to-blue-500 shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save Changes
        </button>
      </div>
    </div>  
    );
    
};

export default UserProfile;
