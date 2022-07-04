import React from 'react';
import "./Header.css";
import img from "./../../assets/meals.jpg"
import HeaderCartButton from './HeaderCartButton';

export default function Header() {
  return (
    <>
      <header className="header">
        <h1>React meals</h1>
        <HeaderCartButton/>
      </header>
      <div className="main-image">
        <img src={img} />
      </div>
    </>
  );
}
