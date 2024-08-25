import  { useEffect, useState } from 'react';
import styles from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/Slices/CartSlice';
import { addToWishlist, removeFromWishlist } from '../../Store/Slices/WishListSlice';
import SimpleAlert from '../SimpleAlert/SimpleAlert';
import { Link } from 'react-router-dom';


export default function Card({ product }) {
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer); 
    }
  }, [showAlert]);
  function addToMyCart(product) {
    if (!isLoggedIn) {
      setAlertMessage('You should log in first to add items to the cart!');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    dispatch(addToCart(product));
    if (isLiked) {
      dispatch(removeFromWishlist(product.id));
    }

    setAlertMessage('Item added to cart successfully!');
    setAlertSeverity('success');
    setShowAlert(true);
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
  return <>
    {showAlert && (
      <div className="alert-wrapper" style={{
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '400px',
        zIndex: 9999,
      }}>
        <SimpleAlert message={alertMessage} severity={alertSeverity} />
      </div>
    )}
    <div className={`${styles.card} mb-4 `} >
    <Link to={`/product/${product.id}`}>
  <img src={product.imageCover} alt={product.title} className="w-100" />
</Link>
       
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
  </>
}
