import React from 'react';
import './Styles.css';
import ReactPlayer from "react-player";

const ChapterSectionAudio = ({ title, subtitle, onClick = () => {}, url=null, redirect = "" }) => {
	return (
		<div className="chapter-section" onClick={() => onClick()}>
			<h3 style={{ fontSize: '1.5rem' }}>{title}</h3>
			{subtitle &&
				<a href={redirect} target="_blank" rel="noopener noreferrer" className="download-link">
					<div className="download-link">{subtitle}</div>
				</a>
			}
			<div className="chapter-section-content">
				<ReactPlayer
					url={url}
					autoPlay={false}
					loop={false}
					playing={false}
					width="100%"
					height="50%"
					stopOnUnmount={true}
					controls={true}
				/>
			</div>
			
		</div>
	);
};

export default ChapterSectionAudio;
