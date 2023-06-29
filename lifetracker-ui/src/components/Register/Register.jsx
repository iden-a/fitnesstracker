import * as React from "react";
import "./Register.css";
import { useState } from "react";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>
        Create an Account
      </h2>

      <div className="register-container">
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
          <label htmlFor="username">Username</label>
          <input
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>

        <div className="input-field">
          <label htmlFor="firstname">First Name</label>
          <input
            value={userInfo.firstname}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                firstname: e.target.value,
              }))
            }
            type="text"
            name="firstname"
            placeholder="First name"
          />
        </div>

        <div className="input-field">
          <label htmlFor="lastname">Last Name</label>
          <input
            value={userInfo.lastname}
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                lastname: e.target.value,
              }))
            }
            type="text"
            name="lastname"
            placeholder="Last name"
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

        <div className="input-field">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={handleConfirmPassword}
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <div id="signup-btn">
          <button>Sign Up</button>
        </div>
        <p style={{ textAlign: "center" }}>Have an Account? Login</p>
      </div>
    </>
  );
}
