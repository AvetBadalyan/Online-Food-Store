import React from "react";
import "./CartItem.css";

export default function CartItem(props) {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className="cart-item">
      <h2> {props.name}</h2>
      <div>
        <div className="cart-summary">
          <span className="cart-price">{price}</span>
          <span className="cart-amount"> x {props.amount} </span>
        </div>
      </div>
      <div className="cart-actions">
        <button onClick={props.onRemove} className="cart-item-button">
          -
        </button>
        <button onClick={props.onAdd} className="cart-item-button">
          +
        </button>
      </div>
    </li>
  );
}
