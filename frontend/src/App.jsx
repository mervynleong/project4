import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import styles from "./css/Header.module.css";
import Marketplace from "./components/Marketplace";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true); // Initially show login
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <div className="contaienr">
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
          }}
        >
          {accessToken && (
            <Routes>
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
          )}
          {/* Display component when accessToken is present */}
          {accessToken && <NavBar></NavBar>}
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
