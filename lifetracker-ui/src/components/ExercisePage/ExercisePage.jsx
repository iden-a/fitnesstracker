import * as React from "react";
import "./ExercisePage.css";
import Bike from "../../assets/bikepath.jpg";
import { useState } from "react";
import axios from "axios";

const categoryOptions = [
  { key: 1, label: "Select a category", value: "select" },
  { key: 2, label: "Run", value: "run" },
  { key: 3, label: "Bike", value: "bike" },
  { key: 4, label: "Lift", value: "Lift" },
  { key: 5, label: "Swim", value: "swim" },
  { key: 6, label: "Sports", value: "sports" },
];


export default function ExercisePage({ appState, setAppState }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [exerInfo, setExerInfo] = useState({
    name: "",
    category: "",
    duration: 0,
    intensity: 0,
  });

  const handleOnInputChange = (e) => {
    setExerInfo({ ...exerInfo, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = async () => {
    // e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }))
  }

  
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
                value={exerInfo.name}
                onChange={handleOnInputChange}
                placeholder="Name"
              />
            </div>
   
            <div className="input-form">
              <label htmlFor="category">Category *</label>
              <select
                name="category"
                onChange={(event) =>
                  setExerInfo((f) => ({ ...f, category: event.target.value }))
                }
              >
                {categoryOptions.map((category) => (
                  <option key={category.key} value={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>


            <div className="input-form">
              <label htmlFor="duration">Duration (min) * </label>
              <input type="number" name="duration" value={exerInfo.duration}  onChange={handleOnInputChange}/>
            </div>

            <div className="input-form">
              <label htmlFor="intensity">Intensity * </label>
              <input type="number" name="intensity" value={exerInfo.intensity}  onChange={handleOnInputChange}/>
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
