import { Link } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    return (
        <div className="header text-center text-white">
            <div className="col-md-6">
                <h1 className="fs-1">
                    Great deals happening <br />
                    Right Now!
                </h1>
                <p>Enjoy a safe, convenient shopping experience</p>
                <p>
                    Shop stress-free from home. We’re ready to help, online or by
                    phone.
                </p>
                <Link to="/" className="btn btn-outline-dark text-light fs-3">Explore Now &#8594;</Link>
            </div>
        </div>
    )
}
