import React from 'react';
import "./Header.css";
import img from "./../../assets/meals.jpg"

export default function Header() {
  return (
    <>
      <header className="header">
        <h1>React meals</h1>
        <button>Cart</button>
      </header>
      <div className="main-image">
        <img src={img} />
      </div>
    </>
  );
}
