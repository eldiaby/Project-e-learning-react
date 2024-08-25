
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Cart.module.css";
import AlertDialog from '../../Components/AlertDialog/AlertDialog';
import { updateCartProductQuantity } from '../../Store/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const cartCount = useSelector((state) => state.cartSlice.cartCount);
    const cartProducts = useSelector((state) => state.cartSlice.cartProducts);
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const handleGoHome = () => {
        navigate('/');  
      };
    function decreaseCount(prodId) {
        const product = cartProducts.find(item => item.id === prodId);
        if (product.count > 1) {
            dispatch(updateCartProductQuantity({ id: prodId, count: product.count - 1 }));
        }
    }

    function increaseCount(prodId) {
        const product = cartProducts.find(item => item.id === prodId);
        if (product.count < product.quantity) {
            dispatch(updateCartProductQuantity({ id: prodId, count: product.count + 1 }));
        }
    }
    const totalPrice = cartProducts.reduce((acc, item) => acc + (item.price * item.count), 0);

    return (
        <div className={`w-75 mx-auto ${styles.cart} mt-5 `}>
            <div className="row rounded rounded-3">
                <div className="col-lg-8  p-5">
                    <div className="mb-3 d-flex justify-content-between">
                        <div>
                            <h4 className="fw-bold">Shopping Cart</h4>
                        </div>
                        <div className="text-muted">{cartCount} items</div>
                    </div>

                    <div className='items'>
                        {cartProducts.length === 0 ? (
          <div className={`col-12 ${styles.emptyWishlist}`}>
            <div className={styles.emptyCard}>
              <h3>Your wishlist is empty</h3>
              <p>Explore more products and add them to your wishlist.</p>
              <button className="btn btn-primary" onClick={handleGoHome}>
                Go to Home
              </button>
            </div>
          </div>
        ):cartProducts.map((item) => (
            <div className="row mb-3" key={item.id}>
                <div className="col-2">
                    <img className="w-100" src={item.imageCover} style={{height:"90px"}} alt={item.title} />
                </div>
                <div className="col-3">
                    <p className="text-muted">{item.category.name}</p>
                    <p>{item.title}</p>
                </div>
                <div className="col-3 d-flex align-items-center">
                 
                    <button 
                        className={`border-0 rounded-2 bg-info bg-main text-white w-25 mx-1 ${item.count === 1 ? styles.disabledBtn : ''}`} 
                        onClick={() => decreaseCount(item.id)}
                        disabled={item.count === 1}
                    >
                        -
                    </button>
                    <button className="border-0 rounded-2 w-25 mx-1">{item.count}</button>
                 
                    <button 
                        className={`border-0 rounded-2 bg-info  text-white w-25 mx-1 ${item.count === item.quantity ? styles.disabledBtn : ''}`} 
                        onClick={() => increaseCount(item.id)}
                        disabled={item.count === item.quantity}
                    >
                        +
                    </button>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <p>{item.price} EGP</p>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <AlertDialog prodId={item.id} />
                </div>
            </div>
        ))}
                         
                    </div>
                </div>

                <div className={`col-lg-4 ${styles.summary} p-5`}>
                    <div className="mb-3">
                        <div>
                            <h4 className="fw-bold">Summary</h4>
                        </div>
                    </div>

                    <div className='d-flex justify-content-between mb-4'>
                        <div>TOTAL PRICE</div>
                        <div>{totalPrice}</div>
                    </div>
                    <button className="btn btn-info">CHECKOUT</button>
                </div>
            </div>
        </div>
    );
}
