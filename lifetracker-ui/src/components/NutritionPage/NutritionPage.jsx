import * as React from "react";
import "./NutritionPage.css";
import Fridge from "../../assets/empty-fridge.jpg";
import { useState } from "react";
import axios from "axios";

const categoryOptions = [
  { key: 1, label: "Select a category", value: "select" },
  { key: 2, label: "Snack", value: "snack" },
  { key: 3, label: "Beverage", value: "beverage" },
  { key: 4, label: "Food", value: "food" },
];

export default function NutritionPage({ appState, setAppState }) {
  const [nutForm, setNutForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [nutInfo, setNutInfo] = useState({
    name: "",
    category: "Select a category",
    quantity: 1,
    calories: 0,
    image_url: null,
  });

  const handleOnInputChange = (event) => {
    setNutInfo({ ...nutInfo, [event.target.name]: event.target.value });
  };

  const handleNutrition = (event) => {
    event.preventDefault(setNutForm(true));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    try {
      const res = await axios.post(`http://localhost:3001/auth/nutrition`, {
        user_id: appState.user.id,
        name: nutInfo.name,
        category: nutInfo.category,
        quantity: nutInfo.quantity,
        calories: nutInfo.calories,
        image_url: nutInfo.image_url,
      });

      console.log(res);
      if (res?.data?.nutrition) {
        setAppState((prevState) => ({
          ...prevState,
          nutrition: res.data.nutrition,
        }));
        console.log(res.data.nutrition);
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid input.",
        }));
      }
    } catch (err) {
      console.log(err);
      const message = "Something went wrong with registration.";
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    }
    setNutForm(false);
  };

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="nutrition-page">
            <div className="banner">
              <h1> Nutrition </h1>
            </div>
            {nutForm ? (
              <div className="record-form">
                <div className="input-form">
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    name="name"
                    value={nutInfo.name}
                    onChange={handleOnInputChange}
                    placeholder="Name"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="input-form">
                  <label htmlFor="category">Category *</label>
                  <select
                    name="category"
                    onChange={(event) =>
                      setNutInfo((f) => ({
                        ...f,
                        category: event.target.value,
                      }))
                    }
                  >
                    {categoryOptions.map((category) => (
                      <option key={category.key} value={category.label}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <span className="error">{errors.category}</span>}
                </div>

                <div className="input-form">
                  <label htmlFor="quantity">Quantity * </label>
                  <input
                    type="number"
                    name="quantity"
                    value={nutInfo.quantity}
                    onChange={handleOnInputChange}
                    required
                  />
              {errors.quantity && <span className="error">{errors.quantity}</span>}

                </div>

                <div className="input-form">
                  <label htmlFor="calories">Calories * </label>
                  <input
                    type="number"
                    name="calories"
                    value={nutInfo.calories}
                    onChange={handleOnInputChange}
                    required
                  />
                {errors.calories && <span className="error">{errors.calories}</span>}

                </div>
                <div className="input-form">
                  <label htmlFor="image_url"></label>
                  <input
                    type="text"
                    name="image_url"
                    value={nutInfo.image_url}
                    onChange={handleOnInputChange}
                    placeholder="url for image"
                    required
                  />
            {errors.image_url && <span className="error">{errors.image_url}</span>}

                </div>
                <button onClick={handleOnSubmit}>Save</button>
              </div>
            ) : (
              <div className="nutrition-auth">
                <h1>Nothing here yet.</h1>
                <button id="nutrition-btn" onClick={handleNutrition}>
                  Add Nutrition
                </button>
                <img src={Fridge} alt="empty fridge" />
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
