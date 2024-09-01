import React, { useState } from 'react';
import styles from './MatchingUrl.module.css';

const MatchingUrl = () => {
  const [selectedButton, setSelectedButton] = useState();

  const handleClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <>
      <span className={styles.urlContainer}>
        <div className={styles.urlText}>
          Do you want a matching domain (.com URL) with your name?
        </div>
      </span>
      <span className={styles.urlButtonsContainer}>
        <div
          className={`${styles.urlButton} ${selectedButton === 1 ? styles.selected : ''}`}
          onClick={() => handleClick(1)}
        >
          <div className={`${styles.answer} ${selectedButton === 1 ? styles.selected : ''}`}>
            Yes
          </div>
          <span className={styles.answerDescription}>
            but minor variations are allowed
          </span>
        </div>
        <div
          className={`${styles.urlButton} ${selectedButton === 2 ? styles.selected : ''}`}
          onClick={() => handleClick(2)}
        >
          <div className={`${styles.answer} ${selectedButton === 2 ? styles.selected : ''}`}>
            Yes
          </div>
          <span className={styles.answerDescription}>
            The Domain should exactly match the name
          </span>
        </div>
        <div
          className={`${styles.urlButton} ${selectedButton === 3 ? styles.selected : ''}`}
          onClick={() => handleClick(3)}
        >
          <div className={`${styles.answer} ${selectedButton === 3 ? styles.selected : ''}`}>
            No
          </div>
          <span className={styles.answerDescription}>
            I am only looking for a name, not a Domain
          </span>
        </div>
      </span>
    </>
  );
};

export default MatchingUrl;
