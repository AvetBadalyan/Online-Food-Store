import React, { useContext } from "react";
import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from "./../../Context/cart-context";
import CartItem from "./CartItem";

export default function Cart({ hideCartHandler }) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1});
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
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
