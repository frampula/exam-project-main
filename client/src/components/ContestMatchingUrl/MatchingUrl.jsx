import React, { useState } from 'react';
import styles from './MatchingUrl.css';

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
  const [selectedButton, setSelectedButton] = useState(null);

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
      <div className="urlButtonsContainer">
        {MatchingUrlData.map((item, index) => (
          <MatchingUrlItem
            isSelect={selectedButton === index}
            onClick={() => handleClick(index)}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </>
  );
};

const MatchingUrlItem = ({ onClick, isSelect, title, text }) => {
  return (
    <>
      <div
        className={`urlButton ${isSelect ? 'selected' : ''}`}
        onClick={() => onClick()}
      >
        <img
          className={`urlImg ${isSelect ? '' : 'hidden'}`}
          src="https://cdn-icons-png.flaticon.com/512/403/403474.png"
        />
        <div className={`answer ${isSelect ? 'selected' : ''}`}>{title}</div>
        <span className="answerDescription">{text}</span>
      </div>
    </>
  );
};

export default MatchingUrl;
