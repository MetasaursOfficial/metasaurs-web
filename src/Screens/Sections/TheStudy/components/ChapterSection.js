import React from 'react';
import './Styles.css';
import {Link} from "react-router-dom";

const ChapterSection = ({ title, subtitle, onClick = () => {}, url=null }) => {
  
  return (
    <div className="chapter-section" onClick={() => onClick()}>
      <h3 style={{ fontSize: '1.5rem' }}>{title}</h3>
      {subtitle && <span>{subtitle}</span>}
      <div className="chapter-section-content">
        <Link to={url} target="_blank" className="download-link" download>
          <button className="button-primary">Download PDF</button></Link>
      </div>
      
    </div>
  );
};

export default ChapterSection;
