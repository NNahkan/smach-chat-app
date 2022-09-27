import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const UserLogin = () => {
  const { authService } = useContext(UserContext);
  const [UserLogins, setUserLogins] = useState({ email: "", password: "" });

  const onChange = ({ target: { name, value } }) => {
    setUserLogins({ ...UserLogins, [name]: value });
  };

  return (
    <div className="center-display">
      <form className="form">
        <label htmlFor="credentials">
          Enter your <strong>email address</strong> and{" "}
          <strong>password</strong>
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="elonmusk@tesla.com"
          onChange={onChange}
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="password"
          onChange={onChange}
        />
        <input type="submit" className="submit-btn" value="Sign In" />
      </form>
      <div className="footer-text">
        No Account? Create one
        <Link to="/register"> Here</Link>
      </div>
    </div>
  );
};

export default UserLogin;
