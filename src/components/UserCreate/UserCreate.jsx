import React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./UserCreate.css";
import { AVATARS } from "../constants.js";

const UserCreate = () => (
  <>
    <div className="center-display">
      <h3 className="title">Create an Account</h3>
      <form className="form">
        <input
          type="text"
          className="form-control"
          name="userName"
          placeholder="enter user name"
        />
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="enter email"
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="enter password"
        />
        <div className="avatar-container">
          <img
            className="avatar-icon avatar-b-radius"
            src="/avatarDefault.png"
            alt="avatar"
          />
          <div className="avatar-text">Choose Avatar</div>
          <div className="avatar-text">Generate Background Color</div>
        </div>
        <input className="submit-btn" type="submit" value="Create Account" />
      </form>
      <div className="footer-text">
        Already have an Account? Login <Link to="/login">Here</Link>
      </div>
    </div>

    <Modal title="Choose Avatar" isOpen={true}>
      <div className="avatar-list">
        {AVATARS.map((img) => (
          <div key={img} className="avatar-icon">
            <img src={img} alt="avatar" />
          </div>
        ))}
      </div>
    </Modal>
  </>
);

export default UserCreate;
