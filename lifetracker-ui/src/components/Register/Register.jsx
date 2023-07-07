import * as React from "react";
import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../services/apiClient";

export default function Register({ setAppState }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      console.log("yes");
      if (
        userInfo.confirmpassword &&
        userInfo.confirmpassword !== event.target.value
      ) {
        setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors((e) => ({ ...e, confirmPassword: null }));
      }
    }
    if (event.target.name === "confirmpassword") {
      if (userInfo.password && userInfo.password !== event.target.value) {
        console.log("no");
        setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
      } else {
        console.log("two");
        setErrors((e) => ({ ...e, confirmPassword: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setUserInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
    if (userInfo.email && userInfo.username && userInfo.first_name && userInfo.last_name, userInfo.passwordConfirm, userInfo.confirmpassword) {


    console.log("anything");

    if (userInfo.confirmpassword !== userInfo.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const token = apiClient.fetchUserByToken;
      apiClient.setToken(token);
      const { data, error, message } = await apiClient.register({
        email: userInfo.email,
        username: userInfo.username,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
      });
      console.log(data);
      if (error) {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
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
        setErrors("Something went wrong with registration")
      }
    } catch (err) {
      console.log(err);
      const message = "Something went wrong with registration";
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    }
  }
    // try {
    //   const res = await axios.post(`http://localhost:3001//auth/register`, {
    //     email: userInfo.email,
    //     username: userInfo.username,
    //     first_name: userInfo.first_name,
    //     last_name: userInfo.last_name,
    //     password: userInfo.password,
    //   });

    //   console.log(res);
    //   if (res?.data?.user) {
    //     localStorage.setItem('lifeTrackerToken', res.data.token)
    //     setAppState((prevState) => ({
    //       ...prevState,
    //       user: res.data.user,
    //       isAuthenticated: true,

    //     }));
    //     setIsLoading(false);
    //     navigate("/");
    //   } else {
    //     setErrors((e) => ({
    //       ...e,
    //       form: "Something went wrong with registration",
    //     }));
    //     setIsLoading(false);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   const message =
    //     "Something went wrong with registration";
    //   setErrors((e) => ({
    //     ...e,
    //     form: message ? String(message) : String(err),
    //   }));
    // }
  };
  return (
    <>
      <h2 style={{ textAlign: "center", fontSize: "40px" }}>
        Create an Account
      </h2>

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
          {errors.email && (
            <span
              className="error"
              style={{ paddingLeft: "20px", color: "red", fontWeight: "bold" }}
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="input-field">
          <label htmlFor="username"></label>
          <input
            className="input"
            style={{ fontSize: "20px" }}
            value={userInfo.username}
            onChange={handleOnInputChange}
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>

        <div className="input-field">
          <label htmlFor="first_name"></label>
          <input
            className="input"
            style={{ fontSize: "20px" }}
            value={userInfo.first_name}
            onChange={handleOnInputChange}
            type="text"
            name="first_name"
            placeholder="First Name"
          />
        </div>

        <div className="input-field">
          <label htmlFor="last_name"></label>
          <input
            className="input"
            style={{ fontSize: "20px" }}
            value={userInfo.last_name}
            onChange={handleOnInputChange}
            type="text"
            name="last_name"
            placeholder="Last Name"
          />
        </div>

        <div className="input-field">
          <span style={{}}>
            <label htmlFor="password"></label>
            <input
              className="input"
              style={{ fontSize: "20px" }}
              value={userInfo.password}
              onChange={handleOnInputChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.confirmPassword && (
            <span
              className="error"
              style={{ paddingLeft: "20px", color: "red", fontWeight: "bold" }}
            >
              {errors.confirmPassword}
            </span>
          )}
          </span>
        </div>

        <div className="input-field">
          <label htmlFor="confirmpassword"></label>
          <input
            className="input"
            style={{ fontSize: "20px" }}
            value={userInfo.confirmpassword}
            onChange={handleOnInputChange}
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span
              className="error"
              style={{ paddingLeft: "20px", color: "red", fontWeight: "bold" }}
            >
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <button id="signup-btn" onClick={handleOnSubmit}>
          Sign Up
        </button>

        <p style={{ textAlign: "center", fontSize: "20px" }}>
          Have an Account? Login
        </p>
      </div>
    </>
  );
}
