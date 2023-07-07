import * as React from "react";
import "./Signin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";


export default function Signin({ setAppState }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      console.log("yes");
      if (event.target.value.indexOf("@") === -1) {
        console.log("no");
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        console.log("mee");
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    setUserInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    try {
      const token = localStorage.getItem("lifeTrackerToken");
      apiClient.setToken(token);
      const { data, error, message } = await apiClient.login({
        email: userInfo.email,
        password: userInfo.password,
      });
      console.log(data);
      if (error) {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with logging in",
        }));
        setIsLoading(false);
        return;
      }
      if (data) {
        setErrors("");
        setAppState((prevState) => ({
          ...prevState,
          user: data.user,
          isAuthenticated: true,
    
        }));
        localStorage.setItem("lifeTrackerToken", data.token)
        apiClient.setToken(data.token)
        navigate("/")
      } else {
        setErrors("Something went wrong with logging in.")
      }
    } catch (err) {
      console.log(err);
      const message = "Something went wrong with logging in.";
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    }

    // try {
    //   const res = await axios.post(`http://localhost:3001/auth/login`, {
    //     email: userInfo.email,
    //     password: userInfo.password,
    //   });

    //   console.log(res);
    //   if (res?.data?.user) {
    //   localStorage.setItem('lifeTrackerToken', res.data.token)
    //     setAppState((prevState) => ({
    //       ...prevState,
    //       user: res.data.user,
    //       isAuthenticated: true
    //     }));
    //     setIsLoading(false);
    //     navigate("/");
    //   } else {
    //     setErrors((e) => ({
    //       ...e,
    //       form: "Something went wrong with logging in",
    //     }));
    //     setIsLoading(false);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   const message = "Incorrect password, try again."
    //   setErrors((e) => ({
    //     ...e,
    //     form: message ? String(message) : String(err),
    //   }));
    // }

  };
  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>Welcome!</h2>
      <div className="form">
        <div className="input-field">
          <label htmlFor="email"></label>
          <input
            className="input"
            style={{ fontSize: "20px" }}
            value={userInfo.email}
            onChange={handleOnInputChange}
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && <span className="error" style={{paddingLeft:'20px', color:'red', fontWeight:'bold'}}>{errors.email}</span>}
        </div>
        <div className="input-field">
          <label htmlFor="password"></label>
          <input
            className="input"
            style={{ fontSize: "20px" }}
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
          {errors.form && (
            <span className="error" style={{paddingLeft:'20px', color:'red', fontWeight:'bold'}}>{errors.form}</span>
          )}
        </div>
        <button id="login-btn" onClick={handleOnSubmit}>
          Login
        </button>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          New to us? Sign Up
        </p>
      </div>
    </>
  );
}
