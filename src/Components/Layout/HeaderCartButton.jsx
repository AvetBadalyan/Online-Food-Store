import React from "react";
import "./HeaderCartButton.css";
import CartIcon from "./../Cart/CartIcon.jsx"

export default function HeaderCartButton() {
  return (
    <button className="button">
      <span className="icon"><CartIcon/> </span>
      <span>Your Cart</span>
      <span className="badge">Count</span>
    </button>
  );
}
