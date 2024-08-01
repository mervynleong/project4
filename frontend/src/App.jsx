import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/user";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Marketplace from "./components/Marketplace";
import Home from "./components/Home";
import styles from "./css/Header.module.css";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");

    // Clear context values
    setAccessToken("");
    setType("");
    setUsername("");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <h1>KERONIAO</h1>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/028/896/726/original/2d-cartoon-crow-bird-flying-frame-by-frame-animation-4k-screen-green-4k-free-video.jpg" />
      </div>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{
            accessToken,
            setAccessToken,
            type,
            setType,
            username,
            setUsername,
            isLoggedIn,
            setIsLoggedIn,
            handleLogout,
          }}
        >
          {/* Display component when accessToken is present */}
          {accessToken && (
            <>
              <NavBar handleLogout={handleLogout} />
              {/* Pass logout function as a prop */}
              <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </>
          )}
          {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
          {!accessToken && !showLogin && (
            <Register setShowLogin={setShowLogin} />
          )}
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
