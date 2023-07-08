import React from "react";

export default function ExerciseCard({ appState, exercise }) {
  const createdAt = new Date(exercise.created_at);
  const formatDate = createdAt.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  const formatTime = createdAt.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="exercise-results">
        <p> Name: {exercise.name} </p>
        <p> Category: {exercise.category} </p>
        <p> Duration: {exercise.duration} min. </p>
        <p>Intensity: {exercise.intensity} </p>
        <p>
          {" "}
          Date: {formatDate} at {formatTime}
        </p>
      </div>
    </>
  );
}
