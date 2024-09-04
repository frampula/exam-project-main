import React, { Component } from 'react';
import Lottie from 'lottie-react';
import { connect } from 'react-redux';
import styles from './HowItWorks.module.css';
import secondAnimation from '../../SecondAnimation.json';
import thirdAnimation from '../../thirdAnimation.json';
import Header from '../../components/Header/Header.jsx';
import CONSTANTS from '../../constants.js';

const HowItWorks = () => {
  return (
    <div className='page'>
    <Header />
        <div className={styles.header}>
          <span className={styles.tagline}>
            Squadhelp will support you on your way of
          </span>
          <span className={styles.taglineSupport}>dreams!</span>
          <div className={styles.sponsors}>
            <a href="https://www.forbes.com/">
              <img
                alt="forbes logo"
                className={styles.img}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}forbes-logo.png`}
              />
            </a>
            <a href="https://thenextweb.com/">
              <img
                alt="the next web logo"
                className={styles.img}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}the-next-web-logo.svg`}
              />
            </a>
            <a href="https://www.bugatti.com/">
              <img
                alt="bugatti logo"
                className={styles.bugatti}
                src={`${CONSTANTS.STATIC_IMAGES_PATH}bugatti-logo.webp`}
              />
            </a>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.launchStep + ' ' + styles.step}>
            <div className={styles.paragraph}>
              Step 1: Launch a Naming Contest.
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src={`${CONSTANTS.STATIC_IMAGES_PATH}greenCheckMark.png`}
                className={styles.checkMark}
              />
              Start your project right with our proven Naming Brief template.
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src={`${CONSTANTS.STATIC_IMAGES_PATH}greenCheckMark.png`}
                className={styles.checkMark}
              />
              We`ll walk you through exactly what you need to share about your
              project in order to get an awesome Name.
            </div>
          </div>
          <Lottie
            className={styles.launchAnimation}
            animationData={CONSTANTS.STATIC_IMAGES_PATH.LaunchAnimation}
            // 123123123
            loop={true}
          />
        </div>

        <div className={styles.startIdeasContainer}>
          <div className={styles.ideasStep  + ' ' + styles.step}>
            <div className={styles.paragraph}>
              Step 2: Ideas start pouring in within minutes
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src={`${CONSTANTS.STATIC_IMAGES_PATH}greenCheckMark.png`}
                className={styles.checkMark}
              />
              100s of naming experts start submitting name ideas
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src={`${CONSTANTS.STATIC_IMAGES_PATH}greenCheckMark.png`}
                className={styles.checkMark}
              />
              Names automatically checked for URL availability
            </div>
          </div>
          <Lottie
            className={styles.ideasAnimation}
            animationData={CONSTANTS.ANIMATIONS_PATH.IdeasAnimation}
            loop={true}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.ratingStep  + ' ' + styles.step}>
            <div className={styles.paragraph}>
              Step 3: Rate Entries & Brainstorm with Creatives
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src={`${CONSTANTS.STATIC_IMAGES_PATH}greenCheckMark.png`}
                className={styles.checkMark}
              />
              Provide instant feedback on Names
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src={`${CONSTANTS.STATIC_IMAGES_PATH}greenCheckMark.png`}
                className={styles.checkMark}
              />
              Send private feedback or public messages to all creatives
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src={`${CONSTANTS.STATIC_IMAGES_PATH}greenCheckMark.png`}
                className={styles.checkMark}
              />
              The more entries you rate - the submissions get better and better
            </div>
          </div>
          <Lottie
            className={styles.ratingAnimation}
            animationData={CONSTANTS.STATIC_IMAGES_PATH.RatingAnimation}
            loop={true}
          />
        </div>
        </div>
  );
};

const mapStateToProps = state => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(HowItWorks);

