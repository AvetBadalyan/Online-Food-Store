import React from "react";
import Input from "../../UI/Input";
import "./MealItemForm.css";

export default function MealItemForm() {
  return (
    <form className="form">
      <Input
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
}
