import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";

const Cart = props => {
  const [totalAmount, setTotalAmount] = useState(0.00);
  const { cart } = props;
  const cartKeys = Object.keys(cart || {});


  // const onClose = e => {
  //   props.onClose && props.onClose(e);
  // };

  useEffect(() => {
    getTotal(cart);
  });

   const getTotal = () => {
    let total = 0;
    for (var key in cart) {
        total += parseFloat((cart[key].amount * cart[key].product.price).toFixed(2));
    }
    
    setTotalAmount(total);
  }

  return (
      !props.show
      ? <></>
      :
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">My Cart</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.removeFromCart}
              />
            ))}
            <div>
                <p>Total (Before Tax): ${ totalAmount }</p>
            </div>
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.emptyCart}
                  className="button is-warning "
                >
                  Clear cart
                </button>{" "}
                <button
                  className="button is-success"
                  onClick={props.showReceipt}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;