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
  const [exerForm, setExerForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [exerInfo, setExerInfo] = useState({
    name: "",
    category: "Select a category",
    duration: 0,
    intensity: 0,
  });

  const handleOnInputChange = (e) => {
    setExerInfo({ ...exerInfo, [e.target.name]: e.target.value });
  };
  console.log(exerInfo);

  const handleExercise = (event) => {
    event.preventDefault()
    setExerForm(true)
    // setErrors((e) => ({ ...e, form: null }));
  }


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
    // console.log(handleOnSubmit)


    try {
      const res = await axios.post(`http://localhost:3001/auth/exercise`, {
        user_id: appState.user.id,
        name: exerInfo.name,
        category: exerInfo.category,
        duration: exerInfo.duration,
        intensity: exerInfo.intensity,
      });

      console.log(res);
      if (res?.data?.exercise) {
        setAppState((prevState) => ({
          ...prevState,
          exercise: res.data.exercise,
        }));
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid input.",
        }));
      }
    } catch (err) {
      console.log(err);
      const message = "Something went wrong with registration.";
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    }
    setExerForm(false)
  };

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="exercise-page">
            <div className="exer-banner">
              <h1 id="banner-title"> Exercise </h1>
            </div>
            
            {exerForm ? (
              <div className="record-form">
                <div className="input-form">
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    name="name"
                    value={exerInfo.name}
                    onChange={handleOnInputChange}
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="input-form">
                  <label htmlFor="category">Category *</label>
                  <select
                    name="category"
                    onChange={(event) =>
                      setExerInfo((f) => ({
                        ...f,
                        category: event.target.value,
                      }))
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
                  <input
                    type="number"
                    name="duration"
                    value={exerInfo.duration}
                    onChange={handleOnInputChange}
                  />
                </div>

                <div className="input-form">
                  <label htmlFor="intensity">Intensity * </label>
                  <input
                    type="number"
                    name="intensity"
                    value={exerInfo.intensity}
                    onChange={handleOnInputChange}
                  />
                </div>
                <button id="form-btn" onClick={handleOnSubmit}>
                  Save
                </button>
              </div>
            ) : (
              <div className="exercise-auth">
                <h1>Nothing here yet.</h1>
                <button id="exercise-btn" onClick={handleExercise}>Add Exercise</button>
                <img src={Bike} alt="bike path for exercise" />
              </div>
            )}
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
