import * as React from "react";
import tracker from "../../assets/tracker.jpg";
import "./Home.css";
import Athlete from "../../assets/athlete.jpg"
import Alarm from "../../assets/alarm.jpg"
import Food from "../../assets/food.jpg"
import Planner from "../../assets/calendar.jpg"



export default function Home({appState}) {
  return (
    <>
    {appState.isAuthenticated ? 
    (
      <>
      <div className="homeauth">
      <div className="titleauth">
      <h1 style={{fontSize: '60px'}} className="auth"> 
      Welcome, {appState.user.first_name}!
      </h1>
      <h3 style={{fontSize: '30px'}}> You're all set to begin your fitness journey.</h3>  
      </div>
      <div className="trackerauth">
      <img src={tracker} alt="fitbit watch"/>
    </div>
    </div>


    <div className="tiles">

        <div className="tile">
        <span style={{fontSize:'20px', padding:'110px', fontWeight:"bold"}}>Fitness</span>
        <img src={Athlete} alt="A person running" />
        </div>

        <div className="tile">
        <span style={{fontSize:'20px', padding:'120px', fontWeight:"bold"}}>Food</span>
        <img src={Food} alt="Food for fuel!" />
        </div>

        <div className="tile">
        <span style={{fontSize:'20px', padding:'120px', fontWeight:"bold"}}>Rest</span>
        <img src={Alarm} alt="Alarm clock!" />
        </div>

        <div className="tile">
        <span style={{fontSize:'20px', padding:'120px', fontWeight:"bold"}}>Planner</span>
        <img src={Planner} alt="A calender for planning things" />
        </div>

    </div>
    </>
      ) : (
      <>
      <div className="home">
    
    <div className="title">
      <h1 style={{fontSize: '70px'}}> FitnessTracker</h1>
      <h3 style={{fontSize: '30px'}}> Helping you stay on track, one day at a time.</h3>  
    </div>

    <div className="tracker">
      <img src={tracker} alt="fitbit watch" />
    </div>
  </div>
 
  <div className="tiles">

        <div className="tile">
        <span style={{fontSize:'20px', padding:'110px', fontWeight:"bold"}}>Fitness</span>
        <img src={Athlete} alt="A person running" />
        </div>

        <div className="tile">
        <span style={{fontSize:'20px', padding:'120px', fontWeight:"bold"}}>Food</span>
        <img src={Food} alt="Food for fuel!" />
        </div>

        <div className="tile">
        <span style={{fontSize:'20px', padding:'120px', fontWeight:"bold"}}>Rest</span>
        <img src={Alarm} alt="Alarm clock!" />
        </div>

        <div className="tile">
        <span style={{fontSize:'20px', padding:'120px', fontWeight:"bold"}}>Planner</span>
        <img src={Planner} alt="A calender for planning things" />
        </div>

    </div>
      
      </>
      )}
     
    </>
  );
}
