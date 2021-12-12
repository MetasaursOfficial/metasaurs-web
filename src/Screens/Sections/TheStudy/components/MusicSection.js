import React from 'react';
import './Styles.css'
import ReactPlayer from "react-player";

const MusicSection = ({
	                      title, onClick = () => {
	},
	                      subtitle = "",
	                      spotify = "",
	                      url = null,
	                      available = false,
	                      message = "",
                      }) => {
	return (
		<div
			className="music-section"
		>
			<div className="music-title-text">{title}</div>
			<a href={spotify} target="_blank" rel="noopener noreferrer" className="download-link">
				<div>{subtitle}</div>
			</a>
			
			<div className="audio-player">
				{available && (
					<ReactPlayer
						url={url}
						autoPlay={false}
						loop={false}
						playing={false}
						width="100%"
						height="100%"
						stopOnUnmount={true}
						controls={true}
					/>
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

export default MusicSection
