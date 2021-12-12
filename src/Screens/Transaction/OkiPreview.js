import React from 'react';
import image from '../../assets/unknown.png'
import './Transaction.css'

const OkiPreview = ({tokenId}) => {
	return(
		<div className="preview-card">
			<img src={image} alt="preview" className="preview-image"/>
			<div className="card-title">{`#${tokenId}`}</div>
		</div>
	)
}

export default OkiPreview
