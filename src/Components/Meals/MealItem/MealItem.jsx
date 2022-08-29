import React, { useContext } from "react";
import "./MealItem.css";
import MealItemForm from "./MealItemForm";
import CartContext from "./../../../Context/cart-context";

export default function MealItem(props) {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  // show single meal with name, price, description and image
  return (
    <li className="meal">
      <div className="meal-item-text-with-image">
        <div className="meal-item-text">
          <h3>{props.name}</h3>
          <div className="description">{props.description}</div>
          <div className="price">{price}</div>
        </div>
        <div>
          <img src={props.photo} alt="meal-item" className="meal-item-image" />
        </div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}
