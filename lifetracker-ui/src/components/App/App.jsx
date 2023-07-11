import * as React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import ActivityPage from "../ActivityPage/ActivityPage";
import ExercisePage from "../ExercisePage/ExercisePage";
import NutritionPage from "../NutritionPage/NutritionPage";
import SleepPage from "../SleepPage/SleepPage";
import apiClient from "../../services/apiClient";
import jwtDecode from "jwt-decode";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
  });

  const token = localStorage.getItem("lifeTrackerToken");
  console.log(token);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("lifeTrackerToken");
      let decodedToken = jwtDecode(token);
      const { email } = decodedToken;
      let user = await apiClient.fetchUserByEmail({ email: email });

      if (isLoggedIn) {
        const userInfo = user.data.user;
        setAppState((prevState) => ({
          ...prevState,
          user: userInfo,
          isAuthenticated: true,
          exercise: user.data.exercise,
        }));
      } else {
        setAppState({
          user: {},
          isAuthenticated: false,
          nutrition: [],
          sleep: [],
          exercise: [],
        });
      }
    };
    fetchUser();
  }, [appState.isAuthenticated]);

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar
            appState={appState}
            setAppState={setAppState}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsLoading={setIsLoading}
          />
          <Routes>
            <Route path="/" element={<Home appState={appState} />} />
            <Route
              path="/activity"
              element={
                <ActivityPage appState={appState} setAppState={setAppState} />
              }
            />
            <Route
              path="/exercise"
              element={
                <ExercisePage appState={appState} setAppState={setAppState} />
              }
            />
            <Route
              path="/nutrition"
              element={
                <NutritionPage appState={appState} setAppState={setAppState} />
              }
            />
            <Route
              path="/sleep"
              element={
                <SleepPage appState={appState} setAppState={setAppState} />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  setAppState={setAppState}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Signin
                  setAppState={setAppState}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
