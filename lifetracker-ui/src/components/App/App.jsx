import * as React from "react";
import './App.css';
import {useState} from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home"
import Signin from "../Signin/Signin";
import Register from "../Register/Register";


export default function App() {
  const [appState, setAppState] = useState({})
  return (
    <>
    <div className="app">
      <BrowserRouter>
      <Navbar  />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}


