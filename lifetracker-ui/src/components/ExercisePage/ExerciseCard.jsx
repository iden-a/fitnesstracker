import React from "react";



export default function ExerciseCard ({exercise}) {

    return (
        <> 
    <div className="exercise-results">
      <p> {exercise.name} </p> 
      <p> {exercise.category}  </p> 
      <p>{exercise.duration} </p>
      <p>{exercise.intensity} </p>
      <p>{exercise.created_at}</p>
      </div>



      
      
      </>

    )
}