import React, { useRef } from "react";
import { useEffect } from "react";
const Sendermessage = ({ message }) => {
  let scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className="w-full flex justify-end px-4 my-2">
      <div className="max-w-[75%] bg-sky-500 text-white rounded-2xl rounded-br-md px-4 py-2 shadow">

        {message.image && (
          <img
            src={message.image}
            alt=""
            className="rounded-lg mb-2 max-h-60 w-full object-cover"
          />
        )}

        {message.text && (
          <p className="break-words whitespace-pre-wrap"
          ref={scroll}>
            {message.text}
          </p>
        )}

        <p className="text-[11px] text-right text-sky-100 mt-1">
          {message.time}
        </p>

      </div>
    </div>
  );
};

export default Sendermessage;