import { Link } from "react-router-dom";
import logo from "../pics/logo_white.svg";
import "../style/Footer.css";

export const Footer = () => {
    return (
        <>
        <footer>
            <div className="footer-wrapper">
                <div className="logo-wrapper">
                    <Link to='/' target='_self'>
                        <img src={logo} alt="logo-white" />
                    </Link>
                </div>
                <div className="links-wrapper">
                    <Link to='/recipes/breakfast' className="recipe-link-footer">
                        BREAKFAST
                    </Link>
                    <span className="bullet-footer">&#x2022;</span>
                    <Link to='/recipes/brunch' className="recipe-link-footer">
                        BRUNCH
                    </Link>
                    <span className="bullet-footer">&#x2022;</span>
                    <Link to='/recipes/lunch' className="recipe-link-footer">
                        LUNCH
                    </Link>
                    <span className="bullet-footer">&#x2022;</span>
                    <Link to='/recipes/dinner' className="recipe-link-footer">
                        DINNER
                    </Link>
                </div>
                <div className="copyright-wrapper">
                    <p>Baby's Food Place</p>
                    <span>copyright &#169; 2021</span>
                </div>
            </div>
        </footer>
        </>
    )
};