import React from "react";
import "./HeaderCartButton.css";
import CartIcon from "./../Cart/CartIcon.jsx";
import { useContext } from "react";
import CartContext from "./../../Context/cart-context";

export default function HeaderCartButton({ showCartHandler }) {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className="button" onClick={showCartHandler}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
}
