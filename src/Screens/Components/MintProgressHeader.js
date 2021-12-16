import React from 'react';
import './Styles.css';

const MintProgressHeader = ({show, link}) => {
	
	if (!show) {
		return null
	}
	
	return (
		<div className="mint-progress-header">
			<div className="mint-progress-text">{`Metasaurs Punks mint in progress. You can see the transaction status here`}</div>
			<a  className="mint-progress-text" href={link} target='_blank'>{link}</a>
		</div>
	)
	
}

export default MintProgressHeader
