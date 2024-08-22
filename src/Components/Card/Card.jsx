import React from 'react';
import styles from './Card.module.css'; // Import your CSS module

export default function Card({ imageCover, categoryName, title, price, ratingAverage }) {
  return (
    <div className={`${styles.card} mb-4 `} >
      <img src={imageCover} alt="" className="w-100" />
      <p className={styles.category}>{categoryName}</p>
      <h3 className={styles.title}>
        {title.split(" ").splice(0, 2).join(" ")}
      </h3>
      <div className='d-flex justify-content-between'>
        <p className={styles.price}>{price} EGP</p>
        <div className={styles.rating}>
          <i className={`fa-solid fa-star ${styles.ratingIcon}`}></i>
          {ratingAverage}
        </div>
      </div>
      <button className={styles.addToCartButton}>
        <i className="fa-solid fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  );
}
