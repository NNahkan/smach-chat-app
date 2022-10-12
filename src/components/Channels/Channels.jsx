import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Modal from "../Modal/Modal";
import "./Channels.css";
import { toCamelCase } from "../../helpers/camelCase";

const Channels = ({ unread }) => {
  const INIT = { name: "", description: "" };
  const [channels, setChannels] = useState([]);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [newChannel, setNewChannel] = useState({});
  const [modal, setModal] = useState(false);
  const {
    authService,
    chatService,
    socketService,
    appSetChannel,
    appSelectedChannel,
  } = useContext(UserContext);

  useEffect(() => {
    setUnreadChannels(unread);
  }, [unread]);

  useEffect(() => {
    chatService.findAllChannels().then((res) => {
      setChannels(res);
      appSetChannel(res[0]);
    });
  }, []);

  useEffect(() => {
    socketService.getChannel((channelList) => {
      setChannels(channelList);
    });
  }, []);

  const selectChannel = (channel) => () => {
    appSetChannel(channel);
    const unread = chatService.setUnreadChannels(channel);
    setUnreadChannels(unread);
  };

  const onChange = ({ target: { name, value } }) => {
    setNewChannel({ ...newChannel, [name]: value });
  };

  const removeChannel = (chId) => () => {
	chatService.deleteChannel(chId);
  }

  const createChannel = (e) => {
    e.preventDefault();
	 const camelChannel = toCamelCase(newChannel.name)
    socketService.addChannel(camelChannel, newChannel.description);
    setNewChannel(INIT);
    setModal(false);
  };

  return (
    <>
      <div className="channel">
        <div className="channel-header">
          <h3 className="channel-label">{authService.name}</h3>
        </div>
        <h3 className="channel-label">
          Channels <span onClick={() => setModal(true)}>Add +</span>
        </h3>
        <div className="channel-list">
          {!!channels.length ? (
            channels.map((channel) => (
              <div
                key={channel.id}
                onClick={selectChannel(channel)}
                className={`channel-label ${
                  unreadChannels.includes(channel.id) ? "unread" : ""
                }`}
              >
                <div
                  className={`inner ${
                    appSelectedChannel.id === channel.id ? "selected" : ""
                  }`}
                >
                  <div>#{toCamelCase(channel.name)}</div>
						<button onClick={removeChannel(channel.id)} className="channelDelete btn">x</button>
                </div>
              </div>
            ))
          ) : (
            <div>No Channels</div>
          )}
        </div>
      </div>
      <Modal title="Create Channel" isOpen={modal} close={setModal}>
        <form className="form channel-form" onSubmit={createChannel}>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            name="name"
            placeholder="enter channel name"
          />
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            name="description"
            placeholder="enter channel description"
          />
          <input type="submit" className="submit-btn" value="Create Channel" />
        </form>
      </Modal>
    </>
  );
};

export default Channels;
