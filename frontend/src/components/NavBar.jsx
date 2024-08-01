import { NavLink } from "react-router-dom";
import styles from "../css/NavBar.module.css";
import React from "react";

const NavBar = ({ handleLogout }) => {
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
          <NavLink to="/marketplace">MARKETPLACE</NavLink>
        </li>
        <li>
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          <button
            style={{
              padding: "5px",
              borderRadius: "15px",
              gap: "1px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
