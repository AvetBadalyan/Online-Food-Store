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
      <div className="meal-item-text">
        <div className="meal-name">
          <p>{props.name}</p>
        </div>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div className="meal-item-image">
        <img src={props.photo} alt="meal-item" />
      </div>
      <div className="form-container">
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}
