import React from "react";
import "./Input.css";

export default React.forwardRef(function Input(props, ref) {
  return (
    <div className="input">
      <label>
        {props.label} <input ref={ref} {...props.input} />
      </label>
    </div>
  );
});
  