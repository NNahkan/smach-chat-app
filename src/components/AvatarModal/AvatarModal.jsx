import React from "react";
import { AVATARS } from "../constants.js";

const AvatarModal = ({choose, isOpen, close }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Choose Avatar</h5>
                <div className="modal-functions">
                  <button
                    onClick={() => close()}
                    className="material-symbols-rounded"
                  >
                    close
                  </button>
                </div>
              </div>
              <div className="modal-body">
                {" "}
                <div className="avatar-list">
                  {AVATARS.map((img) => (
                    <div
                      key={img}
                        onClick={() => choose(img)}
                      className="create-avatar"
                      role="presentation"
                    >
                      <img src={img} alt="avatar" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarModal;
