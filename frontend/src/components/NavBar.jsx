import React from "react";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user";

const NavBar = (props) => {
  const [chatID, setChatID] = useState("");
  const userCtx = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/chat">CHAT</NavLink>
        </li>
        <li>
          <NavLink to="/profile">PROFILE</NavLink>
        </li>
        <li>
          <NavLink to="/register">
            <div>
              <h1>Register</h1>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <div>
              <h1>Login</h1>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
