import React from "react";
import playIcon from '../../../../assets/icon/play-icon.png'

const AnimationItem = ({
	                       title,
	                       subtitle = null,
	                       redirect = null,
	                       url = null,
	                       available = false,
	                       message = "",
	                       onClick = () => {
	                       }
                       }) => {
	return (
		<div
			className="animation-item"
		>
			<div className="music-title-text">{title}</div>
			<a href={redirect} target="_blank" rel="noopener noreferrer" className="download-link">
				<div>{subtitle}</div>
			</a>
			<div className="video-player">
				{available && (
					<img src={playIcon} alt="Play icon" onClick={() => onClick(url)} className="play-button"/>
				)}
				{
					!available && (
						<div>{message}</div>
					)
				}
			</div>
		</div>
	)
}

export default AnimationItem
