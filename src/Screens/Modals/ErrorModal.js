import React from 'react'
import Modal from 'react-modal';
import './Modal.css'

const ErrorModal = ({showModal, onClose, message}) => {
	
	return (
		<Modal
			isOpen={showModal}
			onRequestClose={onClose}
			className="error-modal-container"
			overlayClassName="Overlay"
			ariaHideApp={false}
		>
			<div className="error-modal-content">
				<div className="modal-header" onClick={onClose}>
					<span
						onClick={onClose}
						className="close">&times;</span>
				</div>
				<div className="modal-body">
					<p>{message}.</p>
				</div>
			</div>
		</Modal>
	
	)
}

export default ErrorModal
