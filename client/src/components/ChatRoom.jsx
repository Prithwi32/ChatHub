import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Handshake, Send, Paperclip, Smile, Circle } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import EmojiPicker from "emoji-picker-react"; // ✅ Import emoji picker
import 'react-toastify/dist/ReactToastify.css';
import image from '../assets/images/chat.png'

let socket;
const CONNECTION_PORT = "https://chathub-cr2h.onrender.com";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // ✅ Toggle emoji picker

  useEffect(() => {
    socket = io(CONNECTION_PORT, {
      withCredentials: true,
    });

    socket.on("receive_message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    socket.on("user_typing", (data) => {
      setTyping(data.typing);
    });

    socket.on("update_users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const connectToRoom = () => {
    socket.emit("join_room", { room, userName, avatar });
    setLoggedIn(true);
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      toast.error("Cannot send empty message!");
      return;
    }

    const messageContent = {
      room,
      content: {
        author: userName,
        avatar,
        message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList((prevList) => [...prevList, messageContent.content]);
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", { room, typing: message.length > 0 });
  };

  // ✅ Handle file selection
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    const fileType = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "file";

    const fileMessage = {
      room,
      content: { author: userName, avatar, file: fileURL, fileType },
    };

    socket.emit("send_message", fileMessage);
    setMessageList((prevList) => [...prevList, fileMessage.content]);
  };


  // ✅ Handle emoji selection
  const addEmoji = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji); // Add emoji to message
    setShowEmojiPicker(false); // Hide picker after selecting
  };
  
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-800 dark:from-gray-900 dark:to-black text-white p-6">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-white mt-14 mb-10 md:mt-0">
            Welcome to the Chat Room
          </h1>

          {/* Container Box */}
          <div className="flex flex-col md:flex-row items-center justify-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl max-w-4xl w-full transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <div className="flex justify-center items-center w-full md:w-1/2 transition-transform duration-300 hover:scale-105">
              <img src={image} alt="Chat" className="w-64 md:w-96 h-auto object-contain" />
            </div>

            {/* Form */}
            <div className="w-full md:w-1/2 flex justify-center transition-transform duration-300 hover:scale-105 mt-6 md:mt-0">
              <div className="w-full max-w-md p-6 rounded-xl shadow-xl">
                <h2 className="text-lg md:text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                  Join a Chat Room
                </h2>

                <div className="space-y-4">
                  <input
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    type="text"
                    placeholder="Enter Your Name..."
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <input
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    type="text"
                    placeholder="Enter Room Number..."
                    onChange={(e) => setRoom(e.target.value)}
                  />
                  <button
                    className="w-full p-3 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
                    onClick={connectToRoom}
                  >
                    Enter Chat Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-purple-800 dark:from-gray-900 dark:to-black text-white p-4 mt-10">
        
          {/* Header */}
          <div className="flex items-center justify-between w-full h-20 bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg px-6">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-white">
              Chat Room
            </h1>
            <Handshake className="w-8 h-8 text-white" />
          </div>

          {/* Chat Box */}
          <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            
            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3">
              {messageList.map((val, key) => (
                <div key={key} className={`flex items-center ${val.author === userName ? "justify-end" : "justify-start"}`}>
                  
                  {/* Profile Image */}
                  {val.author !== userName && (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-400">
                      <img src={val.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className={`p-3 max-w-xs md:max-w-sm rounded-lg flex items-center gap-2 ${
                      val.author === userName
                        ? "bg-blue-500 dark:bg-blue-600 text-white self-end"
                        : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start"
                    }`}
                  >
                    <strong>{val.author}</strong>: {val.message}
                    {val.file && (
                      <a href={val.file} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">
                        {val.fileType === "image" ? "📷 Image" : val.fileType === "video" ? "🎥 Video" : "📄 File"}
                      </a>
                    )}
                  </div>

                  {/* Profile Image (for sender) */}
                  {val.author === userName && (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-400">
                      <img src={val.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Status */}
              {typing && <p className="text-gray-400 text-sm">Someone is typing...</p>}
            </div>

            {/* Input Field */}
            <div className="relative flex gap-2 p-2 border-t border-gray-300 dark:border-gray-600">
              {/* Message Input */}
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />

              {/* File Upload Button */}
              <input type="file" id="file-upload" hidden onChange={handleFileUpload} />
              <label htmlFor="file-upload" className="p-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg cursor-pointer">
                <Paperclip />
              </label>

              {/* Emoji Picker Button with Dropdown */}
              <div className="relative">
                <button
                  className="p-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded-lg"
                  onClick={toggleEmojiPicker}
                >
                  <Smile/>
                </button>

                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-50 shadow-lg rounded-lg">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      theme="dark"
                    />
                  </div>
                )}
              </div>

              {/* Send Button */}
              <button
                onClick={sendMessage}
                className="p-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Online Users */}
          <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg flex gap-2">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-green-500">
                  <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <span className="text-gray-700 dark:text-white">{user.name}</span>
                <Circle className="w-3 h-3 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
