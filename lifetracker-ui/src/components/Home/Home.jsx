import * as React from "react";
import tracker from "../../assets/tracker.jpg";
import "./Home.css";
import Athlete from "../../assets/athlete.jpg"
import Alarm from "../../assets/alarm.jpg"
import Food from "../../assets/food.jpg"
import Planner from "../../assets/calendar.jpg"



export default function Home() {
  return (
    <>
      <div className="home">
    
        <div className="title">
          <h1 style={{fontSize: '70px'}}> Get Into it!</h1>
          <h3 style={{fontSize: '30px'}}> Helping you get to the bag, always.</h3>
          
        </div>
        <div className="tracker">
          <img src={tracker} alt="fitbit watch" />
        </div>
      </div>
     
      <div className="tiles">
    
            <div className="tile">
            <span style={{fontSize:'20px', padding:'110px'}}>Fitness</span>
            <img src={Athlete} alt="A person running" />
            </div>

            <div className="tile">
            <span style={{fontSize:'20px', padding:'120px'}}>Food</span>
            <img src={Food} alt="Food for fuel!" />
            </div>

            <div className="tile">
            <span style={{fontSize:'20px', padding:'120px'}}>Rest</span>
            <img src={Alarm} alt="Alarm clock!" />
            </div>

            <div className="tile">
            <span style={{fontSize:'20px', padding:'120px'}}>Planner</span>
            <img src={Planner} alt="A calender for planning things" />
            </div>

        </div>
    </>
  );
}
