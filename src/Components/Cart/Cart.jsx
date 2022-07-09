import React from "react";
import Modal from "../UI/Modal";
import "./Cart.css";

export default function Cart({ hideCartHandler }) {
  const cartItems = (
    <ul className="cart-items">
      {[{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li key={Math.random()}>{item.name} </li>
      ))}
    </ul>
  );
  return (
    <Modal hideCartHandler={hideCartHandler}>
      {cartItems}
      <div className="total">
        <div>Total Amount: </div>
        <div>35$</div>
      </div>
      <div className="actions">
        <button className="button--alt" onClick={hideCartHandler}>
          Close
        </button>
        <button className="button">Order</button>
      </div>
    </Modal>
  );
}
