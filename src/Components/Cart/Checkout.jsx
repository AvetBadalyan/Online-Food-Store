import React from "react";
import "./Checkout.css";

export default function Checkout(props) {
  return (
    <form>
      <div className="control">
        <label>
          Your Name <input type="text" />
        </label>
      </div>
      <div className="control">
        <label>
          Street <input type="text" />
        </label>
      </div>
      <div className="control">
        <label>
          Postal Code <input type="text" />
        </label>
      </div>
      <div className="control">
        <label>
          City <input type="text" />
        </label>
          </div>
          <button type="button" onClick={props.onCancel} >Cancel</button>
      <button>Confirm</button>
    </form>
  );
}
