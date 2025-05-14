import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { setSelectedProduct } from "../../features/productSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(product.image[0].url);

  const handleclick = () => {
    dispatch(setSelectedProduct(product));
    navigate("/Product");
  };

  return (
    <div className={styles.printoProductCard} onClick={() => handleclick()}>
      <div className={styles.printoProductImage}>
        <img src={product.image[0].url} alt={product.name} />
        <button
          className={styles.printoWishlistIcon}
          onClick={() => onToggleWishlist(product.id)}
        >
          <i className="far fa-heart"></i>
        </button>
        <div className={styles.printoQuickView}>Quick View</div>
      </div>
      <div className={styles.printoProductInfo}>
        <h3 className={styles.printoProductTitle}>{product.name}</h3>
        <div className={styles.printoPriceContainer}>
          <span className={styles.printoDiscountedPrice}>
            ₹{product.discountedPrice}
          </span>
          <span className={styles.printoOriginalPrice}>₹{product.price}</span>
          <span className={styles.printoDiscountPercent}>
            {Math.round((1 - product.discountedPrice / product.price) * 100)}%
            OFF
          </span>
        </div>
        <div className={styles.printoColorOptions}>
          {product.colors.map((color) => (
            <span
              key={color}
              className={styles.printoColorDot}
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
        {/* <button
          className={styles.printoAddToCartBtn}
          onClick={() => onAddToCart(product.id)}
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};
export default ProductCard;
