import React, { useState } from 'react';
import styles from './MatchingUrl.module.css';

const MatchingUrlData = [
  {
    title: 'Yes',
    text: 'But minor variations are allowed',
  },
  {
    title: 'Yes',
    text: 'The Domain should exactly match the name',
  },
  {
    title: 'No',
    text: 'I am only looking for a name, not a Domain',
  },
];

const MatchingUrl = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  const handleClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.urlText}>
        Do you want a matching domain (.com URL) with your name?
      </div>
      <div className={styles.urlButtonsContainer}>
        {MatchingUrlData.map((item, index) => (
          <MatchingUrlItem
            key={index}
            isSelect={selectedButton === index}
            onClick={() => handleClick(index)}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

const MatchingUrlItem = ({ onClick, isSelect, title, text }) => {
  return (
    <div
      className={`${styles.urlButton} ${isSelect ? styles.selected : ''}`}
      onClick={() => onClick()}
    >
      <img
        className={`${styles.urlImg} ${isSelect ? '' : styles.hidden}`}
        src="https://cdn-icons-png.flaticon.com/512/403/403474.png"
        alt="url icon"
      />
      <div className={`${styles.answer} ${isSelect ? styles.selected : ''}`}>
        {title}
      </div>
      <span className={styles.answerDescription}>{text}</span>
    </div>
  );
};

export default MatchingUrl;
