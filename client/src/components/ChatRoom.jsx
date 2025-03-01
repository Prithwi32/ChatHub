import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Handshake } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../assets/images/chat.png'

let socket;
const CONNECTION_PORT = "https://chathub-cr2h.onrender.com";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT, {
      withCredentials: true,
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const connectToRoom = () => {
    socket.emit("join_room", room);
    setLoggedIn(true);
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      toast.error("Cannot send empty message!");
      return;
    }

    const messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList((prevList) => [...prevList, messageContent.content]);
    setMessage("");
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
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-purple-800 dark:from-gray-900 dark:to-black text-white p-4">
          {/* Header */}
          <div className="flex items-center justify-center w-full h-20 bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg mb-4">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-white">
              Chat Room
            </h1>
            <Handshake className="ml-2 w-8 h-8 text-white" />
          </div>

          {/* Chat Box */}
          <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            
            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3">
              {messageList.map((val, key) => (
                <div
                  key={key}
                  className={`p-3 max-w-xs md:max-w-sm rounded-lg ${
                    val.author === userName
                      ? "bg-blue-500 dark:bg-blue-600 text-white self-end"
                      : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start"
                  }`}
                >
                  <strong>{val.author}:</strong> {val.message}
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="flex gap-2 p-2 border-t border-gray-300 dark:border-gray-600">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
