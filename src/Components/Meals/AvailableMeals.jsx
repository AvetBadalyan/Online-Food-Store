import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import "./AvailableMeals.css";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://online-foodstore-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("fetching error from server, Something went wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          photo: responseData[key].photo,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="MealsLoading">
        <p>Loading</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className="MealsError">
        <p>{httpError}</p>
      </section>
    );
  }

  const DUMMY_MEALS = [
    {
      id: "d1",
      name: "Sushi",
      description: "Finest fish and veggies",
      price: 22.99,
      photo: "https://buy.am/media/image/f1/e0/48/Yasai-Maki-Sushi-Mushi.jpg",
    },
    {
      id: "d2",
      name: "Schnitzel",
      description: "A german specialty!",
      price: 16.5,
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1200px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG",
    },
    {
      id: "d3",
      name: "Barbecue Burger",
      description: "American, raw, meaty",
      price: 12.99,
      photo:
        "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/exps28800_UG143377D12_18_1b_RMS.jpg",
    },
    {
      id: "d4",
      name: "Green Bowl",
      description: "Healthy...and green...",
      price: 18.99,
      photo: "https://i.ytimg.com/vi/xIULT55Xjmw/maxresdefault.jpg",
    },
  ];

  const mealsList = meals
    .concat(DUMMY_MEALS)
    .map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        photo={meal.photo}
      />
    ));
  return (
    <section className="meals">
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
