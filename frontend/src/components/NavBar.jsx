import { NavLink } from "react-router-dom";
import styles from "../css/NavBar.module.css";
import React from "react";
import UserContext from "../context/user";
import { useContext } from "react";

const NavBar = () => {
  const userCtx = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.removeItem();
    window.location.reload();
  };

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
            onClick={handleLogout}
            style={{
              borderRadius: "10px",
              backgroundColor: "rgb(49, 238, 49)",
              color: "black",
            }}
          >
            Logout?
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
