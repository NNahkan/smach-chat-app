import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import Modal from "../Modal/Modal";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./ChatApp.css";
import { useNavigate } from "react-router-dom";
import Channels from "../Channels/Channels";
import Chats from "../Chats/Chats";
import AvatarModal from "../AvatarModal/AvatarModal";

const ChatApp = () => {
  const { authService, socketService, chatService } = useContext(UserContext);

  const INIT_STATE = {
    userName: authService.name,
    email: authService.email,
    avatarName: authService.avatarName,
    avatarColor: authService.avatarColor,
  };

  const [userInfo, setUserInfo] = useState(INIT_STATE);
  const [modal, setModal] = useState(false);
  const [picsModal, setPicsModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socketService.establishConnection();
    return () => socketService.closeConnection();
  }, []);

  useEffect(() => {
    socketService.getChatMessage((newMessage, messages) => {
      if (newMessage.channelId === chatService.selectedChannel.id) {
        console.log("chatmessage calisti");
        setChatMessages(messages);
      }
      if (chatService.unreadChannels.length) {
        setUnreadChannels(chatService.unreadChannels);
      }
    });
  }, []);

  useEffect(() => {
    socketService.getDeletedMessages((messages) => {
      setChatMessages(messages);
    });
  });

  useEffect(() => {
	socketService.getUpdateMessages((messages) => {
		setChatMessages(messages);
	})
  })

  const logoutUser = () => {
    authService.logoutUser();
    setModal(false);
    navigate("/login");
  };

  const flipToSetting = () => {
    setUpdate(!update);
  };

  const chooseAvatar = (avatar) => {
    setUserInfo({ ...userInfo, avatarName: avatar });
    setPicsModal(false);
    // console.log(avatar);
  };

  const onChange = ({target: {name,value}}) => {
	setUserInfo({...userInfo, [name]:value})
  }

  const generateBgColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setUserInfo({ ...userInfo, avatarColor: `#${randomColor}` });
  };

  const updateUser = () => {
	const { userName, email, avatarName, avatarColor } = userInfo;
	authService.updateUser(userName, email, avatarName, avatarColor)
	setModal(false);
  }

  const { userName, email, avatarName, avatarColor } = userInfo;

  return (
    <div className="chat-app">
      <nav>
        <h1>Smack Chat</h1>
        <div className="user-avatar" onClick={() => setModal(true)}>
          <UserAvatar size="sm" className="nav-avatar" />
          <div>{authService.name}</div>
        </div>
      </nav>
      <div className="smack-app">
        <Channels unread={unreadChannels} />
        <Chats chats={chatMessages} />
      </div>

      <Modal
        title="Profile"
        setting={flipToSetting}
        isOpen={modal}
        close={() => setModal(false)}
      >
        {update ? (
          <>
            <div className="profile">
              <UserAvatar />
              <h4>Username: {authService.name}</h4>
              <h4>Email: {authService.email}</h4>
            </div>
            <button onClick={logoutUser} className="submit-btn logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="profile">
              <div className="avatarWrapper">
                <UserAvatar
                  avatar={{ avatarName, avatarColor }}
                  className="create-avatar"
                />
                <button
                  onClick={() => setPicsModal(true)}
                  className="material-symbols-rounded modifyAvatar"
                >
                  settings
                </button>
              </div>
              <div onClick={generateBgColor} className="avatar-text">
                Generate Background Color
              </div>
              <h4>
                Username:{" "}
                <input onChange={onChange} name='userName' value={userName} type="text" placeholder="Enter your new Username" />
              </h4>
              <h4>
                Email: <input onChange={onChange} name='email' value={email} type="text" placeholder="Enter your new Email" />
              </h4>
            </div>
            <button
              onClick={updateUser}
              style={{ backgroundColor: "green", border: "0" }}
              className="submit-btn logout-btn"
            >
              Update
            </button>
            <AvatarModal
              choose={chooseAvatar}
              close={() => setPicsModal(false)}
              isOpen={picsModal}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ChatApp;
