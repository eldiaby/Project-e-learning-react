import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

export default function Navbar() {
    return <>
        <nav className="navbar navbar-expand-lg mb-5 navbar-light bg-light ">
            <div className="container">
                <NavLink className={`navbar-brand ${style.navbarBrand}`} to="/">E-commerce</NavLink>
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
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink   to="/" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/cart"
                                className={`nav-link ${style.navLink}`}
                                activeClassName={style.navLinkActive}
                            >
                                <div className={style.cartIconWrapper}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className={`position-absolute top-0 start-100 translate-middle badge rounded-circle ${style.badge}`}>
                                        9
                                    </span>

                                </div>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/wishlist" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>Wishlist</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className={`nav-link ${style.navLink}`} activeClassName={style.navLinkActive}>Login</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



    </>
}
