import React from "react";
import ScrollToBootom from "react-scroll-to-bottom";
import Message from "./message/Message";
import "./Messages.css";

import "./Messages.css";

const Messages = ({ messages, name }) => (
  <ScrollToBootom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBootom>
);

export default Messages;
