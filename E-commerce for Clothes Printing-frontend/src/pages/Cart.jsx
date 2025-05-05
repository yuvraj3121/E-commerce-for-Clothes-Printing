import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  incrementCartCount,
  decrementCartCount,
  updateQuantity,
} from "../features/cartSlice";

const Cart = ({}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems);

  return (
    <>
      <button
        className="homeBtn"
        style={{
          margin: "20px",
          position: "absolute",
          top: "10px",
          left: "20px",
          border: "1px solid black",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
        onClick={() => navigate("/")}
      >
        Home
      </button>
      {!user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1>
            Please{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h1>
        </div>
      ) : (
        <div className={styles.cartPage}>
          <h1>Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty</p>
              <Link to="/" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className={styles.cartContainer}>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemDetails}>
                      <h3>{item.name}</h3>
                      <p>Color: {item.color}</p>
                      <p>Size: {item.size}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                    <div className={styles.itemControls}>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartSummary}>
                <h2>Order Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Total</span>
                  <span className={styles.totalPrice}>₹{calculateTotal()}</span>
                </div>
                <Link to="/checkout" className={styles.checkoutBtn}>
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
