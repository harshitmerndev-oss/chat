import React, { use } from "react";
import logo from "../assets/logo.webp";
import { useRef } from "react";
import { useEffect } from "react";

const Receivermessage = ({ message, userImage }) => {
  let scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    
  },[message]);
  return (
    <div className="flex items-end gap-2 px-4 py-1">

    
      <img
        src={userImage || logo}
        alt=""
        className="w-8 h-8 rounded-full object-cover"
      />

    
      <div className="max-w-[75%] bg-white rounded-2xl rounded-bl-md shadow px-4 py-2">

        
        {message?.text && (
          <p className="text-gray-800 break-words text-sm"
          ref={scroll}>
            {message.text}
          </p>
        )}

        
        {message?.image && (
          <img
            src={message.image}
            alt=""
            className="mt-2 rounded-lg max-h-60 w-full object-cover"
          />
        )}

        
        <p className="text-[11px] text-right text-gray-500 mt-1">
          {message?.time}
        </p>

      </div>

    </div>
  );
};

export default Receivermessage;