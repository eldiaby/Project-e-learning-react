import React from 'react';
import styles from './Card.module.css';  
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/Slices/CartSlice';
import { addToWishlist, removeFromWishlist } from '../../Store/Slices/WishListSlice';


export default function Card({ product }) {
  const dispatch = useDispatch()
  function addToMyCart(product) {
    dispatch(addToCart(product));
    if (isLiked) {
      dispatch(removeFromWishlist(product.id));
    }
  
  }

  const wishList = useSelector((state) => state.wishlistSlice.wishlistProducts);
 
 
  const isLiked = wishList.some(p => p.id === product.id);

  const toggleLike = () => {
    if (isLiked) {
      dispatch(removeFromWishlist(product.id));  
    } else {
      dispatch(addToWishlist(product));
    }
  };
  return (
    <div className={`${styles.card} mb-4 `} >
      <img src={product.imageCover} alt="" className="w-100" />
      <p className={styles.category}>{product.categoryName}</p>
      <h3 className={styles.title}>
        {product.title.split(" ").splice(0, 2).join(" ")}
      </h3>
      <div className='d-flex justify-content-between'>
        <p className={styles.price}>{product.price} EGP</p>
        <div className={styles.rating}>
          <i className={`fa-solid fa-star ${styles.ratingIcon}`}></i>
          {product.ratingAverage}
        </div>
      </div>
      <div className='d-flex'>
        <button className={styles.addToCartButton} onClick={() => { addToMyCart({ ...product, count: 1 }) }}>
          <i className="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
        <div className='d-flex align-items-center ps-2'>
          <i className="fa-solid fa-heart fs-4" style={{ color: isLiked ? "red" : "#d9dbdd" }} onClick={toggleLike}></i>

        </div>

      </div>


    </div>
  );
}
