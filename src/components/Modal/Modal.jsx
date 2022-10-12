import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import PropTypes from "prop-types";

import "./Modal.css";

const Modal = ({ children, title, close, isOpen }) => {
   const { authService } = useContext(UserContext);
	const navigate = useNavigate();


	const deleteUser = () => {
		const userId = authService.id;
		authService.deleteUser(userId);
		navigate('/login');
	}
	return (
		<>
		  {isOpen ? (
			 <div className="modal">
				<div className="modal-dialog">
				  <div className="modal-content">
					 <div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<div className="modal-functions">
						  {/* <button onClick={() => close(false)} className="close">
							 &times;
						  </button> */}
						  <button
							 onClick={() => close(false)}
							 className="material-symbols-rounded"
						  >
							 close
						  </button>
						  {title === "Profile" && (
							 <>
								<button onClick={deleteUser} className="material-symbols-rounded">delete</button>
								<button className="material-symbols-rounded">
								  settings
								</button>
							 </>
						  )}
						</div>
					 </div>
					 <div className="modal-body">{children}</div>
				  </div>
				</div>
			 </div>
		  ) : null}
		</>
	 );
}

Modal.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func,
  isOpen: PropTypes.bool,
};

Modal.defaultProps = {
  title: "Title",
  close: () => {},
  isOpen: false,
};

export default Modal;
