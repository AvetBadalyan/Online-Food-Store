import React from "react";
import { useRef } from "react";
import "./Checkout.css";

export default function Checkout(props) {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
  };

  return (
    <form onSubmit={confirmHandler} className="order-form">
      <div className="control">
        <label>
          Your Name <input type="text" ref={nameInputRef} />
        </label>
      </div>
      <div className="control">
        <label>
          Street <input type="text" ref={streetInputRef} />
        </label>
      </div>
      <div className="control">
        <label>
          Postal Code <input type="text" ref={postalCodeInputRef} />
        </label>
      </div>
      <div className="control">
        <label>
          City <input type="text" ref={cityInputRef} />
        </label>
      </div>
      <div className="actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
}
