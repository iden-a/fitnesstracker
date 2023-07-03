import * as React from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";
import ActivityPage from "../ActivityPage/ActivityPage";

export default function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: {},
    sleep: {},
    exercise: {},
  });

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={<Register setAppState={setAppState} />}
            />
            <Route
              path="/#activity"
              element={<ActivityPage setAppState={setAppState} />}
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
