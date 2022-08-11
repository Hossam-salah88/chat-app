import React from "react";
import "./Input.css";

const Input = ({ message, sendMessage, setMessage }) => {
  return (
    <form className="form">
      <div className="form-container">
        <input
          className="input"
          type="text"
          placeholder="type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button
          className="sendButton custom-btn btn-16"
          onClick={(e) => sendMessage(e)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Input;
