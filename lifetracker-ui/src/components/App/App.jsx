import * as React from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import ActivityPage from "../ActivityPage/ActivityPage";
import ExercisePage from "../ExercisePage/ExercisePage";
import NutritionPage from "../NutritionPage/NutritionPage";
import SleepPage from "../SleepPage/SleepPage";

export default function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
  });
console.log(appState)
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar appState={appState} setAppState={setAppState}/>
          <Routes>
            <Route path="/" element={<Home  appState={appState}/>} />
            <Route
              path="/activity"
              element={<ActivityPage appState={appState} setAppState={setAppState} />}
            />
              <Route
              path="/exercise"
              element={<ExercisePage appState={appState} setAppState={setAppState} />}
            />
              <Route
              path="/nutrition"
              element={<NutritionPage appState={appState} setAppState={setAppState} />}
            />
              <Route
              path="/sleep"
              element={<SleepPage appState={appState} setAppState={setAppState} />}
            />
            <Route
              path="/register"
              element={<Register setAppState={setAppState} />}
            />
            <Route
              path="/signin"
              element={<Signin setAppState={setAppState} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
