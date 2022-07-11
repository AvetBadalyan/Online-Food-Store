import React, { useContext } from "react";
import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from './../../Context/cart-context';

export default function Cart({ hideCartHandler }) {

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <li key={Math.random()}>{item.name} </li>
      ))}
    </ul>
  );
  return (
    <Modal hideCartHandler={hideCartHandler}>
      {cartItems}
      <div className="total">
        <div>Total Amount: </div>
        <div>{totalAmount}</div>
      </div>
      <div className="actions">
        <button className="button--alt" onClick={hideCartHandler}>
          Close
        </button>
        {hasItems && <button className="button">Order</button>}
      </div>
    </Modal>
  );
}
