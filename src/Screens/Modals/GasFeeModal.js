import React from 'react'
import Modal from 'react-modal';
import './Modal.css'
import gas1 from '../../assets/gas/gas1.png'
import gas2 from '../../assets/gas/gas2.png'
import gas3 from '../../assets/gas/gas3.png'
import closeIcon from '../../assets/icon/close-black.png'

const GasFeeModal = ({showModal, onClose = () => {}}) => {
	
	return (
		<Modal
			isOpen={showModal}
			onAfterOpen={() => {
			}}
			onRequestClose={onClose}
			className="modal-gas-fee"
			ariaHideApp={false}
		>
			<div className="modal-content">
				<img src={closeIcon} className="close-icon" alt="" onClick={() => onClose()}/>
				<div className="modal-title">Notice!</div>
				<span className="modal-description-text">
					<p>
						{"If your 'Estimated gas Fee' is some absurdly high number"} <b>dont´t freak out. </b>
						{"We've optimized our smart contract to make sure we reduce gas as low as possible. "}
						{"In some cases people have been paying $40 or less in gas. "}
						{"Follow the steps below to edit the gas limit. "}
						<b>Note gas limit should be 154 372 for 1 NFT and around 1 773 933 for 10 NFTs.
						Do not send too low of an amount or you will lose your gas fee.
						</b>
					</p>
					</span>
				<div className="gas-images-section">
					<img src={gas1} className="gas-fee-image" alt="gas descriptions"/>
					<img src={gas2} className="gas-fee-image" alt="gas description 2"/>
					<img src={gas3} className="gas-fee-image" alt="gas description 3"/>
				</div>
				<button
					className="button-primary-modal"
					style={{marginBottom: "2rem"}}
					onClick={() => onClose()}
				>CONTINUE MINTING
				</button>
			</div>
		
		</Modal>
	
	)
}

export default GasFeeModal
