import * as React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div>
          <Link to="/">
            <img src={logo} alt="code path logo" id="logo" />
          </Link>
          <ul
            style={{
              display: "flex",
            }}
          >
            <li>
              <Link to="/activity">Activity</Link>
            </li>
            <li>
              <Link to="/exercise">Exercise</Link>
            </li>
            <li>
              <Link to="/nutrition">Nutrition</Link>
            </li>
            <li>
              <Link to="/sleep">Sleep</Link>
            </li>
            <li>
              <Link to="/signin">
                <button id="signin">Sign In</button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button id="register">Register</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
