import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import logo from "../assets/logo.webp";
import { setSelectedUser, } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect } from "react";
import Sendermessage from "./Sendermessage";
import Receivermessage from "./Receivermessage";
import axios from "axios";
import { serverUrl } from "../main";
import { ImCross } from "react-icons/im";
import DP from "../assets/DP.png"
const MessageArea = () => {
  const dispatch = useDispatch();
  const pickerRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { selectedUser ,socket} = useSelector((state) => state.user);
  let [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [frontendimage, setFrontendimage] = useState(null);
  let [backendimage, setBackendimage] = useState(null);
  let image = useRef();

  const handlesendmessage = async () => {
    if (!message.trim() && !backendimage) {
      return;
    }
    try {
      let formData = new FormData();
      formData.append("message", message);
      if (backendimage) {
        formData.append("image", backendimage);
      }
      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true },
      );
      setMessages((prev) => [...prev, result.data.newMessage]);
      console.log(result.data);
      setMessage("");
      setFrontendimage(null);
      setBackendimage(null);

      if (image.current) {
        image.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };
  const handleimage = (e) => {
    let file = e.target.files[0];
    setBackendimage(file);
    setFrontendimage(URL.createObjectURL(file));
  };
 useEffect(() => {
  if (!socket) return;

  const handleNewMessage = (data) => {
    
    setMessages((prev) => [...prev, data]);
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [socket]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          },
        );

        setMessages(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedUser) {
      getMessages();
    }
  }, [selectedUser]);
  
  if (!selectedUser) {
    return (
      <div className="hidden lg:flex lg:w-[70%] h-screen bg-gray-100 justify-center items-center">
        <div className="text-center">
          <img src={DP} alt="" className="w-40 mx-auto opacity-80 rounded-full" />

          <h1 className="text-4xl font-bold mt-6 text-gray-500">
            Welcome to ConvoAI
          </h1>

          <p className="text-gray-400 mt-2">Select a user to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full lg:w-[70%] h-screen bg-gray-100 overflow-hidden">
    
      <div className="h-20 bg-white shadow-md flex items-center px-4">
        
        <button
          className="lg:hidden mr-3"
          onClick={() => dispatch(setSelectedUser(null))}
        >
          <IoArrowBack size={26} />
        </button>

        <img
          src={selectedUser.image || logo}
          alt=""
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="ml-4">
          <h2 className="font-bold text-lg">{selectedUser.name}</h2>

          <p className="text-sm text-gray-500">@{selectedUser.username}</p>
        </div>
      </div>

      

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {messages.map((msg) =>
          msg.sender === user._id ? (
            <Sendermessage
              key={msg._id}
              message={{
                text: msg.message,
                image: msg.image,
                time: new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }}
            />
          ) : (
            <Receivermessage
              key={msg._id}
              userImage={selectedUser.image}
              message={{
                text: msg.message,
                image: msg.image,
                time: new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }}
            />
          ),
        )}
      </div>
      {false && (
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-2xl text-gray-400 text-center">
            Start chatting with
            <br />
            <span className="font-semibold">{selectedUser.name}</span>
          </h1>
        </div>
      )}
      

      <div className="bg-white p-4 border-t relative">
    

        {showPicker && (
          <div
            ref={pickerRef}
            className="
    absolute
    bottom-20
    left-1/2
    -translate-x-1/2

    sm:left-auto
    sm:right-4
    sm:translate-x-0

    z-50
    w-[95vw]
    max-w-[320px]
    rounded-xl
    overflow-hidden
    shadow-2xl
"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={320}
              height={350}
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
        {frontendimage && (
          <div className="mb-3 relative w-fit">
            <img
              src={frontendimage}
              alt=""
              className="w-32 h-32 rounded-xl object-cover border shadow"
            />

            <button
              onClick={() => {
                setFrontendimage(null);
                setBackendimage(null);
                image.current.value = "";
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              <ImCross />
            </button>
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlesendmessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 min-w-0 border rounded-full px-4 py-3 outline-none"
          />
          <div onClick={() => image.current.click()}>
            <FaImages
              size={20}
              className="cursor-pointer text-gray-600 hover:text-sky-500"
            />
          </div>
          {/* Emoji */}

          <div>
            <RiEmojiStickerLine
              size={20}
              className="cursor-pointer text-gray-600 hover:text-yellow-500"
              onClick={() => setShowPicker((prev) => !prev)}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={image}
            onChange={handleimage}
          />

    

  

          <button
            onClick={handlesendmessage}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
