import React, { useContext, useEffect, useState } from "react";
import "./Chats.css";
import { UserContext } from "../../App";
import UserAvatar from "../UserAvatar/UserAvatar";
import { formatDate } from "../../helpers/dataForm";

const Chats = ({ chats }) => {
  const { authService, chatService, appSelectedChannel, socketService } =
    useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages(chats);
	 console.log("setmessage calisti");
  }, [chats]);

  useEffect(() => {
    if (!!appSelectedChannel.id) {
      chatService
        .findAllMessagesForChannel(appSelectedChannel.id)
        .then((res) => setMessages(res));
    }
  }, [appSelectedChannel]);

  useEffect(() => {
    socketService.getUserTyping((users) => {
      let names = "";
      let usersTyping = 0;
      for (const [typingUser, chId] of Object.entries(users)) {
        if (typingUser !== authService.name && appSelectedChannel.id === chId) {
          names = names === "" ? typingUser : `${names}, ${typingUser}`;
          usersTyping += 1;
        }
      }
      if (usersTyping > 0) {
        const verb = usersTyping > 1 ? "are" : "is";
        setTypingMessage(`${names} ${verb} typing a message...`);
      } else {
        setTypingMessage("");
      }
    });
  }, [appSelectedChannel]);

  const onTyping = ({ target: { value } }) => {
    if (!value.length) {
      setIsTyping(false);
      socketService.stopTyping(authService.name);
    } else if (!isTyping) {
      socketService.startTyping(authService.name, appSelectedChannel.id);
    } else {
      setIsTyping(true);
    }
    setMessageBody(value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const { name, id, avatarName, avatarColor } = authService;
    const user = {
      userName: name,
      userId: id,
      userAvatar: avatarName,
      userAvatarColor: avatarColor,
    };
    socketService.addMessage(messageBody, appSelectedChannel.id, user);
    socketService.stopTyping(authService.name);
    setMessageBody("");
  };

  const deleteMessage = (id,user) => () => {
	const name = authService.name;
	if( user === name) {
		chatService.deleteMessage(id);
	} else {
		console.log('Uye sadece kendi mesajlarini silebilir');
	}
  }

  return (
    <div className="chat">
      { appSelectedChannel ? (
			<div className="chat-header">
			<h3>#{appSelectedChannel.name} - </h3>
			<h4>{appSelectedChannel.description}</h4>
		 </div>
		) : <div>No channel</div>}
      <div className="chat-list">
        {!!messages.length ? (
          messages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <UserAvatar
                avatar={{
                  avatarName: msg.userAvatar,
                  avatarColor: msg.userAvatarColor,
                }}
                size="md"
              />
              <div className="chat-user">
                <strong>{msg.userName}</strong>
                <small>{formatDate(msg.timeStamp)}</small>
					 <button onClick={deleteMessage(msg.id,msg.userName)}>x and id {msg.id}</button>
                <div className="message-body">{msg.messageBody}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No Messages</div>
        )}
      </div>
      <form onSubmit={sendMessage} className="chat-bar">
        <div className="typing ">{typingMessage}</div>
        <div className="chat-wrapper">
          <textarea
            onChange={onTyping}
            value={messageBody}
            placeholder="type a message..."
          />
          <input type="submit" className="submit-btn" value="Send" />
        </div>
      </form>
    </div>
  );
};

export default Chats;
