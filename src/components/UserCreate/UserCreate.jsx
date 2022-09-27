import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./UserCreate.css";
import { AVATARS } from "../constants.js";
import { UserContext } from "../../App";

const UserCreate = () => {
  const { authService } = useContext(UserContext);
  const INIT_STATE = {
    userName: "",
    email: "",
    password: "",
    avatarName: "avatarDefault.png",
    avatarColor: "none",
  };
  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [modal, setModal] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const chooseAvatar = (avatar) => {
    setUserInfo({ ...userInfo, avatarName: avatar });
    setModal(false);
  };

  const generateBgColor = () => {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
	setUserInfo({ ...userInfo, avatarColor: `#${randomColor}`})
  }

  const createUser = (e) => {
	e.preventDefault();
	const { userName, email, password, avatarName, avatarColor } = userInfo;
	if (!!userName && !!email && !!password) {
		 authService.registerUser(email,password).then(() => {
			authService.loginUser(email, password).then(()=> {
				authService.createUser(userName, email, avatarName, avatarColor).then(() => {
					setUserInfo(INIT_STATE);
				})
			})
		 })
	}
  }

  const { userName, email, password, avatarName, avatarColor } = userInfo;

  return (
    <>
      <div className="center-display">
        <h3 className="title">Create an Account</h3>
        <form onSubmit={createUser} className="form">
          <input
            onChange={onChange}
            value={userName}
            type="text"
            className="form-control"
            name="userName"
            placeholder="enter user name"
          />
          <input
            onChange={onChange}
            value={email}
            type="email"
            className="form-control"
            name="email"
            placeholder="enter email"
          />
          <input
            onChange={onChange}
            value={password}
            type="password"
            className="form-control"
            name="password"
            placeholder="enter password"
          />
          <div className="avatar-container">
            <img
				style={{backgroundColor: avatarColor}}
              className="avatar-icon avatar-b-radius"
              src={avatarName}
              alt="avatar"
            />
            <div onClick={() => setModal(true)} className="avatar-text">
              Choose Avatar
            </div>
            <div onClick={generateBgColor} className="avatar-text">Generate Background Color</div>
          </div>
          <input className="submit-btn" type="submit" value="Create Account" />
        </form>
        <div className="footer-text">
          Already have an Account? Login <Link to="/login">Here</Link>
        </div>
      </div>

      <Modal title="Choose Avatar" isOpen={modal} close={() => setModal(false)}>
        <div className="avatar-list">
          {AVATARS.map((img) => (
            <div
              key={img}
              onClick={() => chooseAvatar(img)}
              className="avatar-icon"
				  role="presentation"
            >
              <img src={img} alt="avatar" />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default UserCreate;
