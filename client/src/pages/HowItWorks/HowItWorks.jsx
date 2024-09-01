import React, { Component } from 'react';
import Lottie from 'lottie-react';
import styles from './HowItWorks.module.css';
import firstAnimation from '../../FirstAnimation.json';
import secondAnimation from '../../SecondAnimation.json';
import thirdAnimation from '../../thirdAnimation.json';
import Header from '../../components/Header/Header.jsx';

const HowItWorks = () => {
  return (
    <>
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
                src="../../../public/staticImages/forbes-logo.png"
              />
            </a>
            <a href="https://thenextweb.com/">
              <img
                alt="the next web logo"
                className={styles.img}
                src="../../../public/staticImages/the-next-web-logo.svg"
              />
            </a>
            <a href="https://www.bugatti.com/">
              <img
                alt="bugatti logo"
                className={styles.bugatti}
                src="../../../public/staticImages/bugatti-logo.webp"
              />
            </a>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.step1}>
            <div className={styles.paragraph}>
              Step 1: Launch a Naming Contest.
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src="https://art.kartinkof.club/uploads/posts/2023-07/thumbs/1689244855_art-kartinkof-club-p-idei-dlya-srisovki-galochka-86.png"
                className={styles.checkMark}
              />
              Start your project right with our proven Naming Brief template.
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src="https://art.kartinkof.club/uploads/posts/2023-07/thumbs/1689244855_art-kartinkof-club-p-idei-dlya-srisovki-galochka-86.png"
                className={styles.checkMark}
              />
              We`ll walk you through exactly what you need to share about your
              project in order to get an awesome Name.
            </div>
          </div>
          <Lottie
            className={styles.firstAnimation}
            animationData={firstAnimation}
            loop={true}
          />
        </div>

        <div className={styles.container2}>
          <div className={styles.step2}>
            <div className={styles.paragraph}>
              Step 2: Ideas start pouring in within minutes
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src="https://art.kartinkof.club/uploads/posts/2023-07/thumbs/1689244855_art-kartinkof-club-p-idei-dlya-srisovki-galochka-86.png"
                className={styles.checkMark}
              />
              100s of naming experts start submitting name ideas
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src="https://art.kartinkof.club/uploads/posts/2023-07/thumbs/1689244855_art-kartinkof-club-p-idei-dlya-srisovki-galochka-86.png"
                className={styles.checkMark}
              />
              Names automatically checked for URL availability
            </div>
          </div>
          <Lottie
            className={styles.secondAnimation}
            animationData={secondAnimation}
            loop={true}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.step3}>
            <div className={styles.paragraph}>
              Step 3: Rate Entries & Brainstorm with Creatives
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src="https://art.kartinkof.club/uploads/posts/2023-07/thumbs/1689244855_art-kartinkof-club-p-idei-dlya-srisovki-galochka-86.png"
                className={styles.checkMark}
              />
              Provide instant feedback on Names
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src="https://art.kartinkof.club/uploads/posts/2023-07/thumbs/1689244855_art-kartinkof-club-p-idei-dlya-srisovki-galochka-86.png"
                className={styles.checkMark}
              />
              Send private feedback or public messages to all creatives
            </div>
            <div className={styles.subParagraph}>
              <img
                alt="checkmark"
                src="https://art.kartinkof.club/uploads/posts/2023-07/thumbs/1689244855_art-kartinkof-club-p-idei-dlya-srisovki-galochka-86.png"
                className={styles.checkMark}
              />
              The more entries you rate - the submissions get better and better
            </div>
          </div>
          <Lottie
            className={styles.thirdAnimation}
            animationData={thirdAnimation}
            loop={true}
          />
        </div>
    </>
  );
};

export default HowItWorks;
