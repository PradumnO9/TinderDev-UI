import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { MdArrowBackIosNew } from "react-icons/md";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const loggedInUserId = user?._id;

  const location = useLocation();
  const { firstName, lastName, imageUrl, onlineStatus } = location.state;

  const fetchChatData = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, _id } = msg;
      return {
        loggedInUserId: senderId._id,
        firstName: senderId.firstName,
        lastName: senderId.lastName,
        imageUrl: senderId.imageUrl,
        newMessage: text,
        messageId: _id,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatData();
  }, []);

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

  const sendMessage = (e) => {
    e.preventDefault();
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
      <div className="border-b border-gray-600 p-4">
        <Link to="/connections">
          <div className="flex items-center">
            <MdArrowBackIosNew size={25} className="cursor-pointer mr-2" />

            <div className={`avatar ${onlineStatus && "avatar-online"}`}>
              <div className="w-7 md:w-9 rounded-full">
                <img src={imageUrl} />
              </div>
            </div>
            <div className="mx-2">
              <h1 className="text-lg md:text-xl">
                {firstName} {lastName}
              </h1>
              {onlineStatus && (
                <span className="text-[12px] text-green-400">Active</span>
              )}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg) => {
          return (
            <div
              key={msg?.messageId}
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
              <div
                className={`chat-bubble ${
                  loggedInUserId === msg.loggedInUserId
                    ? "bg-gray-90000"
                    : "bg-gray-600"
                }`}
              >
                {msg?.newMessage}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={sendMessage}>
        <div className="p-3 flex border-t border-gray-600">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input w-full"
          />
          <button className="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
