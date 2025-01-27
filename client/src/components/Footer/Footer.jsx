import React from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

const Footer = () => {
  const renderTopFooterItems = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <a key={i} href="https://google.com">
          {i}
        </a>
      ))}
    </div>
  );

  const renderTopFooter = () =>
    CONSTANTS.FooterItems.map((item) => renderTopFooterItems(item));

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{renderTopFooter()}</div>
      </div>
    </div>
  );
};

export default Footer;
