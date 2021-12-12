import React from 'react';
import './index.css';
/**
 *
 * @param image
 * @param title
 * @param subtitle
 * @param buttonLabel
 * @param enabled
 * @param onClick
 * @param buttonType
 * @constructor
 */
const GenerationCard = ({
  image,
  title,
  subtitle = "",
  buttonLabel,
  enabled,
  onClick = () => {},
  buttonType = 'primary',
  showButton = true,
}) => {
  return (
    <div className="generation-card">
      <img src={image} alt="generation icon" className="card-image" />
      <div className={`card-title ${buttonType}`}>{title}</div>
      <div className={`card-subtitle ${buttonType}`}>{subtitle}</div>
      {
        showButton && (
          <button
            className={`button-gen-${buttonType}`}
            onClick={onClick}
            disabled={!enabled}
          >
            {buttonLabel}
          </button>
        )
      }
      
    </div>
  );
};

export default GenerationCard;
