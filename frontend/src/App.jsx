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

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, type, setType }}
      >
        {/* using accesstoken to set display if accesstoken is true it will display, basically needs login */}
        <Navbar />
        {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
        {!accessToken && !showLogin && <Register setShowLogin={setShowLogin} />}
        {accessToken && <Display />}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
