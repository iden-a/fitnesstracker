import * as React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";

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
              <Link to="/#activity">
              <a href="#activity">Activity</a>
              </Link>
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
