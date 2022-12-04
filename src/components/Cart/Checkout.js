import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length === 4;

const Checkout = (props) => {
  //init useState
  const [formInputValid, setFormInputValid] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  //init input ref
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  //init submit form handler
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPostalValid = isFiveChars(enteredPostal);
    const enteredCityValid = !isEmpty(enteredCity);

    setFormInputValid({
      name: enteredNameValid,
      street: enteredStreetValid,
      city: enteredCityValid,
      postalCode: enteredPostalValid,
    });

    const formIsValid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredPostalValid &&
      enteredCityValid;

    if (formIsValid) {
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostal,
      });
      document.querySelector("#userInfoForm").reset();
    }
  };

  const nameControlClasses = `${classes.control} ${
    formInputValid.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValid.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValid.city ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputValid.postalCode ? "" : classes.invalid
  }`;

  return (
    <form
      className={nameControlClasses}
      onSubmit={confirmHandler}
      id="userInfoForm"
    >
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValid.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValid.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValid.postalCode && (
          <p>Please enter a valid 5 digit postal code.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
