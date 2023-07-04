import * as React from "react";
import "./ExercisePage.css";
import Bike from "../../assets/bikepath.jpg";
import { useState } from "react";

export default function ExercisePage({ appState }) {
  const [info, setInfo] = useState({
    name: "",
    category: "",
    duration: "",
    intensity: "",
  });

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="exercise-page">
            <div className="banner">
              <h1> Exercise </h1>
            </div>
            <div className="exercise-auth">
              <h1>Nothing here yet.</h1>
              <button id="exercise-btn">Add Exercise</button>
              <img src={Bike} alt="bike path for exercise" />
            </div>
          </div>

          <div className="record-form">
            <div className="input-form">
              <label htmlFor="name"></label>
              <input
                type="text"
                name="name"
                value={info.name}
                placeholder="Name"
              />
            </div>

            <div className="input-form">
              <label htmlFor="category">Category * </label>
              <select value={info.category}>
                <option value="select">Select a category</option>
                <option value="run">Run</option>
                <option value="bike">Bike</option>
                <option value="lift">Lift</option>
                <option value="swim">Swim</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div className="input-form">
              <label htmlFor="duration">Duration (min) * </label>
              <input type="number" name="duration" value={info.duration} />
            </div>

            <div className="input-form">
              <label htmlFor="intensity">Intensity * </label>
              <input type="number" name="intensity" value={info.intensity} />
            </div>
            <button id="form-btn">Save</button>

          </div>
        </>
      ) : (
        <h1 style={{ paddingLeft: "180px", fontSize: "40px" }}>
          Log in to see to your data.
        </h1>
      )}
    </>
  );
}
