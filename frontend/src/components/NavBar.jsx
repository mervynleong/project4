import { NavLink } from "react-router-dom";
import styles from "../css/NavBar.module.css";
import React from "react";

const NavBar = () => {
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
            onClick={() => {
              console.log("hello");
            }}
            style={{ backgroundColor: "rgb(49, 238, 49)", color: "black" }}
          >
            Logout?
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
