import * as React from "react";
import "./ActivityPage.css";

export default function ActivityPage({appState}){

    return(
<>
{appState.isAuthenticated ? 
(
    <>
    <div className="activity-title">
    <h1 id="title"> Activity Feed </h1>
    <button id="act-btn"> Add Exercise </button>
    <button id="act-btn"> Log Sleep </button>
    <button id="act-btn"> Record Nutrition </button>
    </div>

    <div className="activity-feed">
    <div className="exercise">
        <h2 id="feed-name"> Total Exercise Minutes</h2>
    </div>
    <div className="sleep">
        <h2 id="feed-name"> Average Hours of Sleep</h2>
    </div>
    <div className="calories">
        <h2 id="feed-name"> Average Daily of Calories</h2>
    </div>
    <div className="stats">
        <h2 id="feed-name"> More Stats</h2>
    </div>
    </div>
    

    </>
) : (
    <h1 style={{paddingLeft:'180px', fontSize:'40px'}}>Log in to see to your data.</h1>
)}

</>
    )
}