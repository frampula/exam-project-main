import React, { Component } from 'react';
import Lottie from 'lottie-react';
import firstImg from '../../window 1.json';

class HowItWorks extends Component {
  render() {
    return (
      <>
        <head></head>
        <body>
          <div className="header">
            <span className="tagline">
              Squadhelp will support you on your way of
            </span>
            <span className="taglineSupport">dreams!</span>
            <div className="info">
              <a href="https://www.forbes.com/">
                <img
                  className="img"
                  src="../../../public/staticImages/forbes-logo.png"
                ></img>
              </a>
              <a href="https://thenextweb.com/">
                <img
                  className="img"
                  src="../../../public/staticImages/the-next-web-logo.svg"
                ></img>
              </a>
              <a href="https://www.bugatti.com/">
                <img
                  id="bugatti"
                  src="../../../public/staticImages/bugatti-logo.webp"
                ></img>
              </a>
            </div>
          </div>
          <div className="container">
            <div className="step1">
              <div className="paragraph">Step 1: Launch a Naming Contest.</div>
              <div className="subParagraph">
                <img
                  src="https://pngicon.ru/file/uploads/zelenaja-galochka.png"
                  className="checkMark"
                ></img>
                Start your project right with our proven Naming Brief template.
              </div>
              <div className="subParagraph">
                <img
                  src="https://pngicon.ru/file/uploads/zelenaja-galochka.png"
                  className="checkMark"
                ></img>
                We`ll walk you through exactly what you need to share about your
                project in order to get an awesome Name.
              </div>
            </div>
            <Lottie className="firstImg" animationData={firstImg} loop={true} />
            ;
          </div>

          <div className="container2">
            <div className="step2">
              <div className="paragraph">
                Step 2: Ideas start pouring in within minutes
              </div>
              <div className='subParagraph'><img
                src="https://pngicon.ru/file/uploads/zelenaja-galochka.png"
                className="checkMark"
              ></img>
              100s of naming experts start submitting name ideas
              </div>
              <div className="subParagraph">
                <img
                  src="https://pngicon.ru/file/uploads/zelenaja-galochka.png"
                  className="checkMark"
                ></img>
                Names automatically checked for URL availability
              </div>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6997/6997779.png"
              className="secondImg"
            />
          </div>
          <div className="container3">
            <div className="step3">
              <div className="paragraph">
                Step 3: Rate Entries & Brainstorm with Creatives
              </div>
              <div className='subParagraph'><img
                src="https://pngicon.ru/file/uploads/zelenaja-galochka.png"
                className="checkMark"
              ></img>
              Provide instant feedback on Names
              </div>
              <div className="subParagraph">
                <img
                  src="https://pngicon.ru/file/uploads/zelenaja-galochka.png"
                  className="checkMark"
                ></img>
                Send private feedback or public messages to all creatives
              </div>
              <div className="subParagraph">
                <img
                  src="https://pngicon.ru/file/uploads/zelenaja-galochka.png"
                  className="checkMark"
                ></img>
                The more entries you rate - the submissions get better and
                better
              </div>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6997/6997779.png"
              className="thirdImg"
            />
          </div>
        </body>
      </>
    );
  }
}

export default HowItWorks;
