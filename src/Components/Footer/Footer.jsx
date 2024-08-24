import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import './Footer.css'; // Import custom CSS for additional styling

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-left">
                        <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-center text-md-right">
                        <div className="social-icons">
                            <a href="#"  className="mx-2">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="mx-2">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="mx-2">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
