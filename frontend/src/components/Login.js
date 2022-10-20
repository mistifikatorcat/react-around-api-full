import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    handleLogin(userData);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h2 className="login__title">Sign In</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="login__input"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />

        <input
          type="password"
          name="password"
          className="login__input"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />

        <div className="login__footer">
          <div className="login__footer-wrapper">
            <button type="submit" className="login__submit">
              Sign In
            </button>
            <p className="login__footer-text">
              Not a member yet?{" "}
              <Link to="/signup" className="login__link">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
