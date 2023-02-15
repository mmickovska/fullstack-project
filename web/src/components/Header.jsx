import { Link } from "react-router-dom";
import logo from "../pics/logo_color.svg";
import "../style/Header.css";

export const Header = () => {
    return (
        <>
        <header>
            <div className="header-wrapper">
                <div className="logo-wrapper">
                    <Link to='/' target='_self'>
                    <img src={logo} alt="logo-color" />
                </Link>
                </div>
                <div className="links-wrapper">
                    <Link to='/recipes/breakfast' className="recipe-link-header">
                    BREAKFAST
                    </Link>
                    <span className="bullet-header">&#x2022;</span>
                    <Link to='/recipes/brunch' className="recipe-link-header">
                        BRUNCH
                    </Link>
                    <span className="bullet-header">&#x2022;</span>
                    <Link to='/recipes/lunch' className="recipe-link-header">
                        LUNCH
                    </Link>
                    <span className="bullet-header">&#x2022;</span>
                    <Link to='/recipes/dinner' className="recipe-link-header">
                        DINNER
                    </Link>
                </div>
                <div className="buttons-wrapper">
                    <Link to='/login' className="login-btn-link">
                        <button className="login-btn">LOG IN</button>
                    </Link>
                    <span className="or">or</span>
                    <Link to='/register' className="register-btn-link">
                        <button className="register-btn">CREATE ACCOUNT</button>
                    </Link>
                </div>
            </div>
        </header>
        </>
    )
};