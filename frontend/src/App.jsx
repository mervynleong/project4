import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import Display from "./components/Display";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true); // Initially show login
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");

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
        <NavBar>
          <Routes>
            <Route path="/Chat" element={<Chat />} />
            {/* Conditional rendering based on accessToken and showLogin */}
            {!accessToken && showLogin && (
              <Route
                path="/Login"
                element={<Login setShowLogin={setShowLogin} />}
              />
            )}
            {!accessToken && !showLogin && (
              <Route path="/Login" element={<Register />} />
            )}
          </Routes>
          {/* Display component when accessToken is present */}
          {accessToken && <Display />}
        </NavBar>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
