import * as React from "react";
import "./NutritionPage.css";
import Fridge from "../../assets/empty-fridge.jpg";
import { useState } from "react";

const categoryOptions = [
  { key: 1, label: "Select a category", value: "select" },
  { key: 2, label: "Snack", value: "snack" },
  { key: 3, label: "Beverage", value: "beverage" },
  { key: 4, label: "Food", value: "food" },
];

export default function NutritionPage({ appState, setAppState }) {
  const [nutriForm, setNutriForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [nutriInfo, setNutriInfo] = useState({
    name: "",
    category: "Select a category",
    quantity: 1,
    calories: 0,
    image_url: null,
  });

  const handleOnInputChange = (event) => {
    setNutriInfo({ ...nutriInfo, [event.target.name]: event.target.value });
  };

  const handleNutrition = (event) => {
    event.preventDefault(setNutriForm(true));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
    if (nutriInfo.name && nutriInfo.category && nutriInfo.quantity && nutriInfo.calories) {


      try {
        const token = localStorage.getItem("lifeTrackerToken");
        apiClient.setToken(token);
        const { data, error, message } = await apiClient.nutrition({
          name: nutriInfo.name,
          category: nutriInfo.category,
          quantity: nutriInfo.quantity,
          calories: nutriInfo.calories,
          image_url: nutriInfo.image_url,
          user_id: appState.user.id
        });
    
        console.log(data);
        if (error) {
          setErrors((e) => ({
            ...e,
            form: "Something went wrong",
          }));
          setIsLoading(false);
          return;
        }
        if (data) {
          setErrors("");
          setAppState((prevState) => ({
            ...prevState,
            user: data.user,
            isAuthenticated: true,
      
          }));
          localStorage.setItem("lifeTrackerToken", data.token)
          apiClient.setToken(data.token)
          navigate("/")
        } else {
          setErrors("Something went wrong.")
        }
      } catch (err) {
        console.log(err);
        const message = "Something went wrong.";
        setErrors((e) => ({
          ...e,
          form: message ? String(message) : String(err),
        }));
      }

    setNutriForm(false);
  };
}

  return (
    <>
      {appState.isAuthenticated ? (
        <>
          <div className="nutrition-page">
            <div className="nut-banner">
              <h1 id="banner-title"> Nutrition </h1>
            </div>
            {nutriForm ? (
              <div className="record-form">
                <div className="input-form">
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    name="name"
                    value={nutriInfo.name}
                    onChange={handleOnInputChange}
                    placeholder="Name"
                  />
                </div>

                <div className="input-form">
                  <label htmlFor="category">Category *</label>
                  <select
                    name="category"
                    onChange={(event) =>
                      setNutriInfo((f) => ({
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
                </div>

                <div className="input-form">
                  <label htmlFor="quantity">Quantity * </label>
                  <input
                    type="number"
                    name="quantity"
                    value={nutriInfo.quantity}
                    onChange={handleOnInputChange}
                  />

                </div>

                <div className="input-form">
                  <label htmlFor="calories">Calories * </label>
                  <input
                    type="number"
                    name="calories"
                    value={nutriInfo.calories}
                    onChange={handleOnInputChange}
                  />

                </div>
                <div className="input-form">
                  <label htmlFor="image_url"></label>
                  <input
                    type="text"
                    name="image_url"
                    value={nutriInfo.image_url}
                    onChange={handleOnInputChange}
                    placeholder="url for image"
                  />

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
