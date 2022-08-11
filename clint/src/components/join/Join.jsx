import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="center">
      <h1>Login</h1>
      <form>
        <div className="txt_field">
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <span></span>
          <label>Name</label>
        </div>
        <div className="txt_field">
          <input
            required
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
          <span></span>
          <label>Room</label>
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <input type="submit" value="Login" />
        </Link>
      </form>
      <div className="signup_link">Have A Nice Time</div>
    </div>
  );
};

export default Join;
