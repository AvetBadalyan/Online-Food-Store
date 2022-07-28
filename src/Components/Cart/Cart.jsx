import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from "./../../Context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart({ hideCartHandler }) {
  const [isCheckout, setIsChekout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsChekout(true);
  };

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

  const modalActions = (
    <div className="actions">
      <button className="button--alt" onClick={hideCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className="total">
        <div>Total Amount: </div>
        <div>{totalAmount}</div>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={hideCartHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const isSubmittedModalContent = <p>Successfully sent the order ✅ </p>;

  return (
    <Modal hideCartHandler={hideCartHandler}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && isSubmitted && isSubmittedModalContent}
    </Modal>
  );
}
