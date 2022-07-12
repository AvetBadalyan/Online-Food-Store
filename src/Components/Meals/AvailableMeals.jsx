import React from "react";
import Card from "../UI/Card";
import "./AvailableMeals.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Armenian Khorovats",
    description: "Pork Loin",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Beef Qebab",
    description: "Delicious food",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Spas - Armenian Yogurt soup",
    description: "yogurt, greens, wheat",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Qyufta",
    description: "Armenian national food",
    price: 18.99,
  },

  {
    id: "m5",
    name: "Potato and fat BBQ",
    description: "250g, served with 1/2 lavash",
    price: 18.99,
  },
];

export default function AvailableMeals() {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
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
