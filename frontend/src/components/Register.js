import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    handleRegister(userData);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="register">
      <h2 className="register__title">Sign Up</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="register__input"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />

        <input
          type="password"
          name="password"
          className="register__input"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />

        <div className="register__footer">
          <div className="register__footer-wrapper">
            <button type="submit" className="register__submit">
              Sign Up
            </button>
            <p className="register__footer-text">
              Already a member?{" "}
              <Link to="/login" className="register__link">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
