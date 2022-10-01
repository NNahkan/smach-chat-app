import React, { useState,useContext } from "react";
import { UserContext } from "../../App";
import Modal from "../Modal/Modal";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./ChatApp.css";
import { useNavigate } from "react-router-dom";
import Channels from "../Channels/Channels";

const ChatApp = () => {
  const { authService } = useContext(UserContext);
	const [modal, setModal ] = useState(false);
	const navigate = useNavigate();


	const logoutUser = () => {
		authService.logoutUser();
		setModal(false);
		navigate('/login')
	}

  return (
    <div className="chat-app">
      <nav>
        <h1>Smack Chat</h1>
        <div className="user-avatar" onClick={() => setModal(true)}>
           <UserAvatar size="sm" className='nav-avatar' />
          <div>{authService.name}</div>
        </div>
      </nav>
		<div className="smack-app">
			<Channels/>
		</div>


		<Modal title="Profile" isOpen={modal}	 close={() => setModal(false)}>
	<div className="profile">
		<UserAvatar/>
		<h4>Username: {authService.name}</h4>
		<h4>Email: {authService.email}</h4>
	</div>
		<button onClick={logoutUser}	className="submit-btn logout-btn">Logout</button>
		</Modal>
    </div>
  );
};

export default ChatApp;
