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

  const mealsList = meals.map((meal) => (
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
