import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
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
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
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
  );
};

export default Cart;