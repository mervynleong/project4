import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/user";
import Display from "./components/Display";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [item_uuid, setItem_uuid] = useState("");

  return (
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
        {/* using accesstoken to set display if accesstoken is true it will display, basically needs login */}
        <NavBar username={username} />
        <div className="bar">
          <Routes>
            <Route path="chat" element={<Chat />} />
            {accessToken && (
              <Route
                path="chat/:item_uuid"
                element={<Chat username={username} item_uuid={item_uuid} />}
              />
            )}

            {!accessToken && showLogin && (
              <Route
                path="login"
                element={
                  <Login
                    setShowLogin={setShowLogin}
                    setAccessToken={setAccessToken}
                  />
                }
              />
            )}
          </Routes>
          {!accessToken && !showLogin && (
            <Register setShowLogin={setShowLogin} />
          )}
        </div>
        {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
        {!accessToken && !showLogin && <Register setShowLogin={setShowLogin} />}
        {accessToken && <Display />}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
