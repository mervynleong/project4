import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState(null);

  const logout = () => {
    setAccessToken(null);
    setUserType(null);
    setUsername(null);
    // Optionally clear localStorage or cookies here
    localStorage.removeItem("accessToken"); // If you store token in localStorage
    // or document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;'; // If you use cookies
  };

  return (
    <UserContext.Provider
      value={{
        accessToken,
        userType,
        username,
        setAccessToken,
        setUserType,
        setUsername,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
