import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-1  bg-dark text-white fixed-bottom">
            <div className="container">
                <div className="row">
                <div className=' col-4'>
              <p className='fs-5'>GET IN TOUCH</p>
              <p className=''>megz@gmail.com</p>
              <p className=''>011-4333-6842</p>
            </div>
            <div className=' col-4 m-auto '>
              <button type='button' className='btn btn-outline-light ms-5'>
                CONTACT ME
              </button>
            </div>
            <div className='bl7 col-4 my-auto'>
              <div className='social-containet ms-5  d-flex flex-row-reverse'>
                    <span className='icon d-flex justify-content-center m-3 align-items-center rounded-circle'>
                    <a href='#'>
                        <i className='fab fa-facebook-f' />
                    </a>
                    </span>
                    <span className='icon d-flex justify-content-center m-3 align-items-center rounded-circle'>
                    <a href='#'>
                        <i className='fab fa-instagram' />
                    </a>
                    </span>
                    <span className='icon d-flex justify-content-center m-3 align-items-center rounded-circle'>
                    <a href='#'>
                        <i className='fab fa-youtube' />
                    </a>
                    </span>
                    <span className='icon d-flex justify-content-center m-3 align-items-center rounded-circle'>
                    <a href='#'>
                        <i className='fab fa-twitter' />
                    </a>
                    </span>
              </div>
              <p className='text-center   d-flex flex-row-reverse'>
                <span>     Megzat</span>
                © all rights reserved by 
              </p>
            </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
