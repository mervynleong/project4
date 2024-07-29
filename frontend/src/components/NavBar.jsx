import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/NavBar.module.css";

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
      </ul>
    </nav>
  );
};

export default NavBar;
