import React from "react";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user";
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
      </ul>
    </nav>
  );
};

export default NavBar;
