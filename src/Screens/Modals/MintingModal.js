import React from 'react'
import Modal from 'react-modal';
import './Modal.css'
import ReactPlayer from 'react-player'

const MintingModal = ({showModal, onClose}) => {
	
	return (
		<Modal
			isOpen={showModal}
			onAfterOpen={() => {}}
			onRequestClose={onClose}
			className="modal-minting"
			ariaHideApp={false}
		>
			<div className="animation">
				<ReactPlayer
					url='https://iko-web-assets.s3.us-west-2.amazonaws.com/loader.mp4'
					autoPlay={true}
					loop={true}
					playing={showModal}
					width="100%"
					height="100%"
					stopOnUnmount={true}
				/>
			</div>
		</Modal>
		
	)
}

export default MintingModal
