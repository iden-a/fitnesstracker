import * as React from "react";
import "./Navbar.css";
import logo from "../../assets/codepath.svg";
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div>
          <img src={logo} alt="code path logo" id="logo" />
          <ul
            style={{
              display: "flex",
            }}
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#activity">Activity</a>
            </li>
            <li>
              <a href="#exercise">Exercise</a>
            </li>
            <li>
              <a href="#nutrition">Nutrition</a>
            </li>
            <li>
              <a href="#sleep">Sleep</a>
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
