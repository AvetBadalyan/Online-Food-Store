import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from "./../../Context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import AuthForm from "../Auth/AuthForm";

export default function Cart({ hideCartHandler }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `: ${cartCtx.totalAmount.toFixed(2)}$`;
  const hasItems = cartCtx.items.length > 0;
  const [isOrderClicked, setIsOrderClicked] = useState(false);

  // check if the login process has successfully completed, in case of success the token must be truthy
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;

  // on click the log out button

  const logOutHandler = () => {
    setToken(null);
  };

  // add or remove items from the cart
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // fetch with POST method in firebase the order that user made
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://online-foodstore-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  };

  // mapping on cart items in a list
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

  // create buttons to close the cart or make an order
  const modalActions = (
    <div className="actions">
      <button className="button--alt" onClick={hideCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={() => setIsOrderClicked(true)}>
          Order
        </button>
      )}
    </div>
  );

  // the main content of the cart
  const cartModalContent = (
    <>
      {cartItems}
      <div className="cart-modal-content">
        <div className="total">
          <div>Total Amount</div>
          <div>{totalAmount}</div>
        </div>
        {isOrderClicked && !isLoggedIn && <AuthForm setToken={setToken} />}

        {isLoggedIn && (
          <div className="logout-actions">
            <button className="logout" onClick={logOutHandler}>
              Log out
            </button>
          </div>
        )}

        {/* user input data including name, street, postal code and the city to make an order */}
        {isLoggedIn && (
          <Checkout onConfirm={submitOrderHandler} onCancel={hideCartHandler} />
        )}
        {!isLoggedIn && modalActions}
      </div>
    </>
  );

  // cart content during submitting the order
  const isSubmittingModalContent = <p>Sending order data...</p>;

  // cart content after submitting the order
  const isSubmittedModalContent = (
    <div className="success-order">
      <p>Successfully sent the order ✅ </p>
      <button className="button" onClick={hideCartHandler}>
        Close
      </button>
    </div>
  );

  return (
    <Modal hideCartHandler={hideCartHandler}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && isSubmitted && isSubmittedModalContent}
    </Modal>
  );
}
