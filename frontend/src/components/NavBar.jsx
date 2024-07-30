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
      <li
        style={{
          margin: "0",
          padding: "0",
          listStyle: "none",
        }}
      >
        <button
          style={{
            backgroundColor: "rgb(49, 238, 49)",
            color: "black",
            position: "fixed",
            top: 0,
            right: 0,
            margin: "10px",
          }}
          className="logout"
          onClick={() => console.log("hello")}
        >
          Logout
        </button>
      </li>
    </nav>
  );
};

export default NavBar;
