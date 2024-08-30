import React, { useState } from 'react';
import styles from './MatchingUrl.css';

const MatchingUrl = () => {
  const [selectedButton, setSelectedButton] = useState();

  const handleClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <>
      <span className="urlContainer">
        <div className="urlText">
          Do you want a matching domain (.com URL) with your name?
        </div>
      </span>
      <span className="urlButtonsContainer">
        <div
          className={`urlButton ${selectedButton === 1 ? 'selected' : ''}`}
          onClick={() => handleClick(1)}
        >
          <div className={`answer ${selectedButton === 1 ? 'selected' : ''}`}>
            Yes
          </div>
          <span className="answerDescription">
            but minor variations are allowed
          </span>
        </div>
        <div
          className={`urlButton ${selectedButton === 2 ? 'selected' : ''}`}
          onClick={() => handleClick(2)}
        >
          <div className={`answer ${selectedButton === 2 ? 'selected' : ''}`}>
            Yes
          </div>
          <span className="answerDescription">
            The Domain should exactly match the name
          </span>
        </div>
        <div
          className={`urlButton ${selectedButton === 3 ? 'selected' : ''}`}
          onClick={() => handleClick(3)}
        >
          <div className={`answer ${selectedButton === 3 ? 'selected' : ''}`}>
            No
          </div>
          <span className="answerDescription">
            I am only looking for a name, not a Domain
          </span>
        </div>
      </span>
    </>
  );
};

export default MatchingUrl;
