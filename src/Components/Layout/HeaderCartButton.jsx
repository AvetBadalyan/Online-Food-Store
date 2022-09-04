import React, { useContext, useEffect, useState } from "react";
import "./HeaderCartButton.css";
import CartIcon from "./../Cart/CartIcon.jsx";
import CartContext from "./../../Context/cart-context";

export default function HeaderCartButton({ showCartHandler }) {
  // add bump effect on Cart button when adding items
  const [isBump, setIsBump] = useState(false);
  const buttonWithBump = `button ${isBump ? "bump" : ""}`;

  // calculate the total number of items in the cart with array reduce method
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBump(true);

    const timer = setTimeout(() => {
      setIsBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonWithBump} onClick={showCartHandler}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
}
