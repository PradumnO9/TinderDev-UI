import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const loggedInUserId = user?._id;

  useEffect(() => {
    if (!loggedInUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { loggedInUserId, targetUserId });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, imageUrl, newMessage, loggedInUserId }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { loggedInUserId, firstName, lastName, imageUrl, newMessage },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      imageUrl: user?.imageUrl,
      loggedInUserId,
      targetUserId,
      newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-[95%] md:w-[70%] my-10 mx-auto border border-gray-600 h-[70vh] shadow-2xl rounded-2xl flex flex-col">
      <h1 className="p-5 border-b border-gray-600 text-2xl">Chat</h1>
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg) => {
          return (
            <div
              key={msg.loggedInUserId}
              className={
                loggedInUserId === msg.loggedInUserId
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="Image" src={msg?.imageUrl} />
                </div>
              </div>
              <div className="chat-header">
                {`${msg?.firstName} ${msg?.lastName}`}
              </div>
              <div className="chat-bubble">{msg?.newMessage}</div>
            </div>
          );
        })}
      </div>
      <div className="p-3 flex border-t border-gray-600">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input w-full"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
