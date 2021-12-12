import React from 'react';
import './Styles.css';

const MintProgressHeader = ({show, link}) => {
	
	if (!show) {
		return null
	}
	
	return (
		<div className="mint-progress-header">
			<div className="mint-progress-text">{`Your Oki's mint is in progress... You can see the transaction progress here:`}</div>
			<a  className="mint-progress-text" href={link} target='_blank'>{link}</a>
		</div>
	)
	
}

export default MintProgressHeader
