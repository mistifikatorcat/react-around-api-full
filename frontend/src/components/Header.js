import logo from "../images/Vector.svg";
import { Link, useLocation } from "react-router-dom";
import React from "react";

function Header({ isLoggedIn, email, signout }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__wrapper">
        <img className="header__logo" alt="Around the US logo" src={logo} />
        {isLoggedIn ? (
          <nav className="header__navbar">
            <p className="header__mail">{email}</p>
            <div className="header__logout" onClick={signout}>
              Log Out
            </div>
          </nav>
        ) : (
          <Link
            to={location.pathname === "/signin" ? "/signup" : "/signin"}
            className="header__link"
          >
            {location.pathname === "/signin" ? "Sign Up" : "Sign In"}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
