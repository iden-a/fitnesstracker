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
          <label htmlFor="email"></label>
          <input className="input" style={{fontSize:"20px"}}
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
          <label htmlFor="password"></label>
          <input className="input" style={{fontSize:"20px"}}
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
        <p style={{ textAlign: "center", fontSize:"20px"}}>
          New to us? Sign Up
        </p>
      </div>
    </>
  );
}
