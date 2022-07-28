import React, { useState } from "react";
import { useRef } from "react";
import "./Checkout.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

export default function Checkout(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // getting values from inputs with ref
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // input validation
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    // submit cart data
  };

  return (
    <form onSubmit={confirmHandler} className="order-form">
      <div className={formInputsValidity.name ? "control" : "control invalid"}>
        <label>
          Your Name <input type="text" ref={nameInputRef} />
        </label>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>

      <div
        className={formInputsValidity.street ? "control" : "control invalid"}
      >
        <label>
          Street <input type="text" ref={streetInputRef} />
        </label>
        {!formInputsValidity.street && <p>Please enter a valid Street!</p>}
      </div>

      <div
        className={
          formInputsValidity.postalCode ? "control" : "control invalid"
        }
      >
        <label>
          Postal Code <input type="text" ref={postalCodeInputRef} />
        </label>
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters)!</p>
        )}
      </div>

      <div className={formInputsValidity.city ? "control" : "control invalid"}>
        <label>
          City <input type="text" ref={cityInputRef} />
        </label>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
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
