import React from 'react';
import '../Creators.css';
import lockIcon from '../../../../assets/lock/lock.png';

const FeatureCard = ({ image = null, label = '', bgImg = '', onClick = () => {}}) => {
  return (
    <div className="feature-card" onClick={() => onClick()}>
      <div className={`icon-creator ${bgImg}`}>
        <img src={lockIcon} alt="lock" className="lock-icon" />
        {image && <img src={image} alt="asset" />}
      </div>
      <div className="feature-label">{label}</div>
    </div>
  );
};

export default FeatureCard;
