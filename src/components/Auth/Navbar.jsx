import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../Common/ThemeToggle";
import "../../styles/Navbar.css";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          Task Manager
        </Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="welcome">Welcome , {user.username} </span>
            <button className="btn-ghost" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
