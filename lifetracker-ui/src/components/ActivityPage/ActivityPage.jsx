import * as React from "react";
import "./ActivityPage.css";

export default function ActivityPage({ appState }) {

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="activity-title">
            <h1 id="title" style={{ fontSize: "40px" }}>
              {" "}
              Activity Feed{" "}
            </h1>
            <button id="act-btn"> Add Exercise </button>
          </div>

          <div className="activity-feed">
            <div className="exercise">
              <h1 id="feed-name"> Total Exercise Minutes</h1>
              <h1> Loading... </h1>
              
            </div>
            <div className="stats">
              <h2 id="feed-name"> More Stats</h2>
              <h1> Loading... </h1>

            </div>
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
