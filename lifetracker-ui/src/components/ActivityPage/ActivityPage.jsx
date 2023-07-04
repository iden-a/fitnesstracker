import * as React from "react";
import "./ActivityPage.css";

export default function ActivityPage({appState}){

    return(
<>
{appState.isAuthenticated ? 
(
    <>
    <div className="activity-title">
    <h1> Activity Feed </h1>
    <button id="act-btn"> Add Exercise </button>
    <button id="act-btn"> Log Sleep </button>
    <button id="act-btn"> Record Nutrition </button>
    </div>

    

    </>
) : (
    <h1 style={{paddingLeft:'180px', fontSize:'40px'}}>Log in to see to your data.</h1>
)}

</>
    )
}