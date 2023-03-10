import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handlerOrderClick = () => {
    setIsCheckout(true);
  };

  const handlerSubmitOrder = async (userData) => {
    setIsLoading(true);
    setIsSubmitted(false);
    const response = await fetch(
      "https://react-practice01-2a758-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    if (response.ok) {
      setIsLoading(false);
      setIsSubmitted(true);
      cartCtx.clear();
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handlerOrderClick}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onClose={props.onCloseCart} onConfirm={handlerSubmitOrder} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const submittedContent = <p>Success!!! Thank you!!!</p>;

  return (
    <Modal onClick={props.onCloseCart}>
      {!isLoading && !isSubmitted && modalContent}
      {isLoading && <p>Loading Content...</p>}
      {!isLoading && isSubmitted && submittedContent}
    </Modal>
  );
};

export default Cart;
