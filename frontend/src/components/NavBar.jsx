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
          <NavLink to="/Chat">CHAT</NavLink>
        </li>
        <li>
          <NavLink to="/Profile">PROFILE</NavLink>
        </li>
        {!userCtx.accessToken && (
          <li>
            <NavLink to="/Register">
              <div>
                <h1>Login/Register</h1>
              </div>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
