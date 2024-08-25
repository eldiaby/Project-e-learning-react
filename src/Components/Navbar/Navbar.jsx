import { NavLink, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../Store/Slices/LanguageSlice';
import { logout } from '../../Store/Slices/isLogginInSlice';
 

export default function Navbar() {
    const cartCount = useSelector((state) => state.cartSlice.cartCount);
    const myLang = useSelector((state) => state.LanguageSlice.language);
    const translate = useSelector((state) => state.LanguageSlice.translation);
    const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn); // استخدام useSelector للتحقق من حالة تسجيل الدخول
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function toggleLang() {
        const newLang = myLang === 'en' ? 'ar' : 'en';
        dispatch(setLang(newLang));
    }

    function handleLogout() {
        localStorage.removeItem('userToken');
        dispatch(logout());  
        navigate('/login');
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark mb-5 ${style.navbar}`} dir={myLang === "en" ? "ltr" : "rtl"}>
                <div className="container">
                    <NavLink className={`navbar-brand ${style.navbarBrand}`} to="/">MyApp</NavLink>
                    <button
                        className={`navbar-toggler ${style.navbarToggler}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className={`navbar-toggler-icon ${style.navbarTogglerIcon}`}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className={`navbar-nav ms-auto ${style.navItems}`}>
                            <li className="nav-item">
                                <NavLink to="/" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>{translate.home}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>{translate.about}</NavLink>
                            </li>
                          
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/cart" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>
                                            <div className={style.cartIconWrapper}>
                                                <i className="fa-solid fa-cart-shopping"></i>
                                                <span className={`position-absolute top-0 start-100 translate-middle badge rounded-circle ${style.badge}`}>
                                                    {cartCount}
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/wishlist" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>
                                            <i className="fa-solid fa-heart fs-4 text-danger"></i>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link ${style.navLink} ${style.logoutButton}`} onClick={handleLogout}>{translate.logout}</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>{translate.login}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/register" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>{translate.register}</NavLink>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <button className={`btn btn-outline-info ${style.langButton}`} onClick={toggleLang}>
                                    {myLang === "en" ? "Arabic" : "English"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
