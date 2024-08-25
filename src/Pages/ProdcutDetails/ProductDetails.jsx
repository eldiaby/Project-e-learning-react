import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductDetails.module.css';
import { addToCart } from '../../Store/Slices/CartSlice';
import { addToWishlist, removeFromWishlist } from '../../Store/Slices/WishListSlice';
import { useDispatch, useSelector } from 'react-redux';
import SimpleAlert from '../../Components/SimpleAlert/SimpleAlert';

export default function ProductDetails() {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
    const wishList = useSelector((state) => state.wishlistSlice.wishlistProducts);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
            .then(response => {
                setProduct(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching product details.');
                setLoading(false);
            });
    }, [productId]);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 2000);
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [showAlert]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const isLiked = wishList.some(p => p.id === product?.id);

    const handleAddToCart = () => {
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
    };

    const handleAddToWishlist = () => {
        if (!isLoggedIn) {
            setAlertMessage('You should log in first to add items to the wishlist!');
            setAlertSeverity('error');
            setShowAlert(true);
            return;
        }

        if (isLiked) {
            dispatch(removeFromWishlist(product.id));
            setAlertMessage('Item removed from wishlist!');
        } else {
            dispatch(addToWishlist(product));
            setAlertMessage('Item added to wishlist!');
        }
        setAlertSeverity('success');
        setShowAlert(true);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>★</span>
            );
        }
        return stars;
    };

    return (
        <div className={`${styles.productDetails} container mt-5`}>
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
            <div className="row">
                <div className="col-md-4">
                    <div className={styles.sliderContainer}>
                        <Slider {...sliderSettings}>
                            {product.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`product-image-${index}`} style={{ height: "300px", width: "100%" }} className={styles.sliderImage} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="col-md-8">
                    <h1 className={styles.productTitle}>{product.title}</h1>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>Price: <span>{product.price} EGP</span></p>
                    <div className={styles.productRating}>
                        Rating: {renderStars(Math.round(product.ratingsAverage))}
                    </div>
                    <p className={styles.productSold}>Sold: <span>{product.sold}</span></p>
                    <p className={styles.productCategory}>Category: <span>{product.category.name}</span></p>
                    <p className={styles.productBrand}>Brand: <span>{product.brand.name}</span></p>
                   <div className="d-flex">
                   <button className={styles.addToCartButton} onClick={() => { handleAddToCart }}>
                        <i className="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                    <button
                        className={`${styles.addButton} ${isLiked ? styles.liked : ''}`}
                        onClick={handleAddToWishlist}
                    >
                        <i className="fa-solid fa-heart"></i>
                        {isLiked ? ' Remove from Wishlist' : ' Add to Wishlist'}
                    </button>
                   </div>
                </div>
            </div>
        </div>
    );
}
