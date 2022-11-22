import React from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const inputAttribute = {
    id: "amount" + props.id,
    type: "number",
    min: "1",
    max: "5",
    step: "1",
    defaultValue: "1",
  };
  return (
    <form className={classes.form}>
      <Input label="Amount" input={inputAttribute} />
      <button>+ Add</button>
    </form>
  );
}

export default MealItemForm;
