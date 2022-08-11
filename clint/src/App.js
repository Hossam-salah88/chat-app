import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Join from "./components/join/Join";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);

export default App;
