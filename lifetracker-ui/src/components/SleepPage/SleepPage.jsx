import * as React from "react";
import "./SleepPage.css";
import Bed from "../../assets/empty-bed.jpg";
import { useState } from "react";
import axios from "axios";

export default function SleepPage({ appState, setAppState }) {
  const [sleepForm, setSleepForm] = useState(false)
  const [isLoading, setIsLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [sleepInfo, setSleepInfo] = useState({
    start_time: "",
    end_time: "",
  });

  const handleOnInputChange = (e) => {
    setSleepInfo({ ...sleepInfo, [e.target.name]: e.target.value });
  }

  const handleSleep = (event) => {
    event.preventDefault()
      setSleepForm(true)
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
  

  try {
      const res = await axios.post(`http://localhost:3001/auth/sleep`, {
        user_id: appState.user.id, 
      start_time: sleepInfo.start_time, 
        end_time: sleepInfo.end_time
    });

    console.log(res);
    if(res?.data?.sleep) {
      setAppState((prevState) => ({
        ...prevState,
        sleep:[res.data.sleep, ...prevState.sleep]
      }));
      console.log(res.data.sleep)
    } else {
      setErrors((e) => ({
        ...e,
        form: "Invalid input."
      }))
    } 
  } catch (err) {
    console.log(err);
    const message =
      "Something went wrong with registration.";
    setErrors((e) => ({
      ...e,
      form: message ? String(message) : String(err),
    }));
  }
  setSleepForm(false)
  }

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="sleep-page">
            <div className="sleep-banner">
              <h1 id="banner-title">
                {" "}
                Sleep{" "}
              </h1>
            </div>

            {sleepForm ? (
              <div className="record-form">
            <div className="input-form">
              <label htmlFor="start_time"> Start Time * </label>
              <input type="datetime-local" name="start_time" value={sleepInfo.start_time} onChange={handleOnInputChange}/>
            </div>

            <div className="input-form">
              <label htmlFor="end_time"> End Time * </label>
              <input type="datetime-local" name="end_time" value={sleepInfo.end_time} onChange={handleOnInputChange}/>
            </div>
            <button onClick={handleOnSubmit} id="save-btn">Save</button>
          </div>

            ) : (
              <div className="sleep-auth">
              <h1>Nothing here yet.</h1>
              <button id="sleep-btn" onClick={handleSleep}>Add Sleep</button>
              <img src={Bed} alt="bike path for exercise" />
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
