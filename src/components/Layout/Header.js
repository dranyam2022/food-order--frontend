import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Food Order Website</h1>
        <HeaderCartButton onOpenCart={props.onOpenCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table of delicious food." />
      </div>
    </React.Fragment>
  );
}

export default Header;
