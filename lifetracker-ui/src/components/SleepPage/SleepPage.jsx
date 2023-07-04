import * as React from "react";
import "./SleepPage.css";
import Bed from "../../assets/empty-bed.jpg";
import { useState } from "react";

export default function SleepPage({ appState }) {
  const [info, setInfo] = useState({
    start_time: "",
    end_time: "",
  });

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="sleep-page">
            <div className="banner">
              <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
                {" "}
                Sleep{" "}
              </h1>
            </div>
            <div className="sleep-auth">
              <h1>Nothing here yet.</h1>
              <button id="sleep-btn">Add Sleep</button>
              <img src={Bed} alt="bike path for exercise" />
            </div>
          </div>

          <div className="record-form">
            <div className="input-form">
              <label htmlFor="start_time"> Start Time * </label>
              <input type="date" name="start_time" value={info.start_time} />
            </div>

            <div className="input-form">
              <label htmlFor="end_time"> End Time * </label>
              <input type="date" name="end_time" value={info.end_time} />
            </div>
            <button>Save</button>
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
