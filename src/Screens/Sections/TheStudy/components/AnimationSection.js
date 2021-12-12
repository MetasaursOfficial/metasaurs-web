import React from 'react';
import AnimationItem from "./AnimationItem";
import './Styles.css'

const AnimationSection = ({data = null, emptyMessage = "", onPlayURL = () => {}}) => {
	
	if (!data) {
		return (
			<>
				<h3 className="title shadow">Animation</h3>
				<div className="sub-title">{emptyMessage}</div>
			</>
			
		)
	}
	
	return (
		<>
			<h3 className="title shadow">Animation</h3>
			<div className="section">
				{
					data.map(item => (
						<AnimationItem
							key={item.index}
							title={item.title}
							subtitle={item.subtitle}
							redirect={item.redirect}
							url={item.url}
							available={item.available}
							message={item.message}
							onClick={onPlayURL}
						/>
						
					))
				}
			
			</div>
		</>
	)
}

export default AnimationSection
