import React from 'react';
import './ResumeStyles.css';

const AttributesGrid = ({attributes}) => {

	
	const renderTrait = ({trait_type, value}) => {
		return(
			<div key={trait_type} className={"trait-card"}>
				<div className="trait-title">{trait_type.toUpperCase()}</div>
				<div className="trait-value">{value.toUpperCase()}</div>
			</div>
		)
	}
	
	if (!attributes || attributes.length === 0) {
		return <></>
	}
	
	return (
		<div className="trait-grid">
			{
				attributes.map(attribute => renderTrait(attribute))
			}
		</div>
	)
}

export default AttributesGrid
