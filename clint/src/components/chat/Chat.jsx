import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";

import "./Chat.css";
import InfoBar from "../infoBar/InfoBar";
import Input from "../input/Input";
import Messages from "../messages/Messages";
import TextContainer from "../textContainer/TextContainer";

let socket;

const Chat = () => {
  const [searchParams] = useSearchParams("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = Object.fromEntries([...searchParams]);
    console.log(name, room);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, [ENDPOINT, searchParams]);

  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, [message]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  // ============ function for sending messages =========================
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    console.log(message, messages);
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
