import React from 'react';
import ReactPlayer from "react-player";
import Modal from "react-modal";
import './Modal.css'

const VideoModal = ({show, url, onClose}) => {
	console.log("VideoModal show: ", show)
	return(
		<Modal
			isOpen={show}
			onAfterOpen={() => {}}
			onRequestClose={onClose}
			className="modal-video"
			ariaHideApp={false}
			overlayClassName="Overlay"
		>
			<div className="video-close-header">
				<div className="modal-header" onClick={onClose}>
					<span
						onClick={onClose}
						className="close">&times;</span>
				</div>
			</div>
			
			<div className="video-wrapper">
				<ReactPlayer
					url={url}
					autoPlay={true}
					loop={true}
					playing={show}
					width="100%"
					height="100%"
					stopOnUnmount={true}
					controls={true}
				/>
			</div>
		</Modal>
	)

}

export default VideoModal
