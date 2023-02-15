import { Link } from "react-router-dom";
import logo from "../pics/logo_color.svg";
import "../style/Header.css";
import "../style/HeaderTwo.css";

export const HeaderTwo = () => {
    return (
        <>
        <header>
            <div className="header-two-wrapper">
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
                <div className="links-wrapper-two">
                    <Link to='/my-recipes' className="recipe-link-header-two my-recipes-link">
                        MY RECIPES
                    </Link>
                    <span className="bullet-header-two">&#x2022;</span>
                    <Link to='/my-profile' className="recipe-link-header-two my-profile-link">
                        MY PROFILE
                    </Link>
                    <span className="bullet-header-two">&#x2022;</span>
                    <Link to='/login' className="recipe-link-header-two log-out-link">
                        LOG OUT
                    </Link>
                </div>
            </div>
        </header>
        </>
    )
};