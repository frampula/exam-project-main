import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import HowItWorksStyle from '../../pages/HowItWorks/HowItWorks.module.css'

class Header extends React.Component {

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.history.replace('/login');
  };

  startContests = () => {
    this.props.history.push('/startContest');
  };

  startReview = () => {
    this.props.history.push('/startReview');
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.PUBLIC_URL}${this.props.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={this.logOut}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href="http://www.google.com">Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>(877)&nbsp;355-3585</span>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <a href='/'>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
          </a>
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>Name Ideas</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">BEAUTY</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">CONSULTING</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">E-COMMERCE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">FASHION & CLOTHING</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">FINANCE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">REAL ESTATE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">TECH</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">MORE CATEGORIES</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Contests</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                  <Link to="/how-it-works" style={{ HowItWorksStyle }}>
                    <li>
                      <a href=''>HOW IT WORKS</a>
                    </li>
                    </Link>
                    <li>
                      <a href="http://www.google.com">PRICING</a>
                    </li>
                    <Link to="/events">
                    <li>
                      <a href="http://www.google.com">UPCOMING EVENTS</a>
                    </li>
                    </Link>
                    <li>
                      <a href="http://www.google.com">ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">WINNERS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Our Work</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">TAGLINES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Names For Sale</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">SHORT NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Blog</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href="http://www.google.com">CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {this.props.data && this.props.data.role === CONSTANTS.CUSTOMER && (
              <div
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                START CONTEST
              </div>
            )}
            {this.props.data && this.props.data.role === CONSTANTS.MODERATOR && (
              <div
                className={styles.startContestBtn}
                onClick={this.startReview}
              >
                START REVIEW
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
