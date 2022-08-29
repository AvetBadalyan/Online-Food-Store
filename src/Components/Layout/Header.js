import React from "react";
import "./Header.css";
import img from "./../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

export default function Header({ showCartHandler }) {
  return (
    <>
      <header className="header">
        <h1>
          <i>AVET'S FOOD STORE</i>
        </h1>
        <HeaderCartButton showCartHandler={showCartHandler} />
      </header>
      <div className="main-image">
        <img src={img} alt="foods" />
      </div>
    </>
  );
}
