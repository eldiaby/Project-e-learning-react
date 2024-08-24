import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../Components/Card/Card';
import { useNavigate } from 'react-router-dom';
import styles from './WishList.module.css';

const WishList = () => {
  const wishList = useSelector((state) => state.wishlistSlice.wishlistProducts);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');  
  };

  return (
    <div className="row">
      <h2 className="text-center mb-4">My Wishlist</h2>
      <div className="row">
        {wishList.length === 0 ? (
          <div className={`col-12 ${styles.emptyWishlist}`}>
            <div className={styles.emptyCard}>
              <h3>Your wishlist is empty</h3>
              <p>Explore more products and add them to your wishlist.</p>
              <button className="btn btn-primary" onClick={handleGoHome}>
                Go to Home
              </button>
            </div>
          </div>
        ) : (
          wishList.map((product) => (
            <div key={product.id} className="col-md-2  ">
              <Card product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishList;
