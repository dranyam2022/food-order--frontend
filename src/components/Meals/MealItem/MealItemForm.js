import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  const inputAttribute = {
    id: "amount_" + props.id,
    type: "number",
    min: "1",
    max: "5",
    step: "1",
    defaultValue: "1",
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input label="Amount" input={inputAttribute} ref={amountInputRef} />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
