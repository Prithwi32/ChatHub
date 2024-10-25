import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Handshake } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let socket;
const CONNECTION_PORT = "http://localhost:3000";

function App() {
  // Before Login
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
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
    // Set up message listener
    socket.on("receive_message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    // Cleanup listener on unmount
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-800 text-white p-4">
          <div className="flex justify-center items-center w-full h-32 bg-opacity-90 shadow-lg mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-center">
              Welcome to the Chat Room
            </h1>
          </div>

          <div className="flex flex-col gap-8 items-center bg-white bg-opacity-10 p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-lg">
            <h2 className="text-lg md:text-xl font-semibold tracking-wide text-center">
              Join a Room to Start Chatting
            </h2>

            <div className="flex flex-col gap-4 w-full">
              <input
                className="w-full border border-blue-300 p-3 rounded-lg bg-opacity-80 bg-white text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="Enter Your Name..."
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="w-full border border-blue-300 p-3 rounded-lg bg-opacity-80 bg-white text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="text"
                placeholder="Enter Room Number..."
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
            <button
              className="w-full mt-4 p-3 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out"
              onClick={connectToRoom}
            >
              Enter Chat Room
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-4 gap-8 bg-gradient-to-br from-blue-500 to-purple-800 min-h-screen">
          {/* Header Section */}
          <div className="flex justify-center items-center w-full h-32 bg-opacity-90 shadow-lg mb-8 rounded-lg">
            <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide text-center">
              Welcome to the Chat Room
            </h1>
            <div className="text-white mt-4 ml-2">
              <Handshake className="w-12 h-12" />
            </div>
          </div>
          {/* Chat Body Section */}
          <div className="w-full h-[calc(100vh-200px)] border border-gray-300 bg-opacity-20 rounded-lg shadow-lg bg-white overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {messageList.map((val, key) => (
                <div
                  key={key}
                  className={`p-3 rounded-lg text-white ${
                    val.author === userName
                      ? "bg-gradient-to-br from-blue-500 to-purple-800 self-end"
                      : "bg-gradient-to-br from-gray-800 to-purple-800"
                  } max-w-[70%]`}
                >
                  <h1 className="whitespace-pre-wrap">
                    <strong>{val.author}:</strong> {val.message}
                  </h1>
                </div>
              ))}
            </div>
            {/* Message Input Section */}
            <div className="flex gap-4 p-4 border-t border-gray-300">
              <input
                type="text"
                placeholder="Type a Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="border border-gray-500 p-2 hover:bg-green-600 bg-green-500 text-white text-xl rounded-lg transition duration-300"
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
