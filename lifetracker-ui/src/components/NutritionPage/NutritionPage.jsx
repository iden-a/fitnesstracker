import * as React from "react";
import "./NutritionPage.css";
import Fridge from "../../assets/empty-fridge.jpg";
import { useState } from "react";

export default function NutritionPage({ appState }) {
  const [info, setInfo] = useState({
    name: "",
    category: "",
    quantity: "",
    calories: "",
    image_url: null,
  });

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="nutrition-page">
            <div className="banner">
              <h1> Nutrition </h1>
            </div>
            <div className="nutrition-auth">
              <h1>Nothing here yet.</h1>
              <button id="nutrition-btn">Add Nutrition</button>
              <img src={Fridge} alt="empty fridge" />
            </div>
          </div>
          <div className="record-form">
            <div className="input-form">
              <label htmlFor="name"></label>
              <input
                type="text"
                name="name"
                value={info.name}
                placeholder="Name"
              />
            </div>

            <div className="input-form">
              <label htmlFor="category">Category * </label>
              <select value={info.category}>
                <option value="select">Select a category</option>
                <option value="snack">Snack</option>
                <option value="beverage">Beverage</option>
                <option value="food">Food</option>
              </select>
            </div>

            <div className="input-form">
              <label htmlFor="quantity">Quantity * </label>
              <input type="number" name="quantity" value={info.quantity} />
            </div>

            <div className="input-form">
              <label htmlFor="calories">Calories * </label>
              <input type="number" name="calories" value={info.calories} />
            </div>
            <div className="input-form">
              <label htmlFor="image_url"></label>
              <input
                type="text"
                name="image_url"
                value={info.image_url}
                placeholder="url for image"
              />
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
