import React from "react";
import "./MealItem.css"

export default function MealItem(props) {
    const price = `$${props.price.toFixed(2)}`
  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
          <div>
              extra component
      </div>
    </li>
  );
}
