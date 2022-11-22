import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCartHandler = () => {
    setIsCartOpen(true);
    console.log("cart is now open");
  };

  const closeCartHandler = () => {
    setIsCartOpen(false);
    console.log("cart is now closed");
  };

  return (
    <React.Fragment>
      {!isCartOpen ? "" : <Cart onCloseCart={closeCartHandler}/>}
      <Header onOpenCart={openCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
