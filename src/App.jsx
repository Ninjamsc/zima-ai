// src/App.jsx
import React, { useState } from "react";
import LandingPage from "./LandingPage";
import ChatPage from "./ChatPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  const goToChat = () => setCurrentPage("chat");
  const goToLanding = () => setCurrentPage("landing");

  return (
    <div className="app">
      {currentPage === "landing" ? (
        <LandingPage onTryChat={goToChat} />
      ) : (
        <ChatPage onBack={goToLanding} />
      )}
    </div>
  );
}

export default App;
