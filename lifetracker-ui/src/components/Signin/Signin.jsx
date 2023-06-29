import * as React from "react";
import "./Signin.css";
import { useState } from "react";

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Welcome</h2>
      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button id="login-btn">Login</button>
        <p style={{ textAlign: "center", fontSize: "25px" }}>
          New to us? Sign Up
        </p>
      </div>
    </>
  );
}
