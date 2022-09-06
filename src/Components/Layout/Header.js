import React from "react";
import "./Header.css";
import img from "./../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

export default function Header({ showCartHandler }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="store-name">
            <i>AVET'S FOOD STORE</i>
          </div>
          <HeaderCartButton showCartHandler={showCartHandler} />
        </div>
      </header>
      <div className="main-image">
        <img src={img} alt="foods" />
      </div>
    </>
  );
}
