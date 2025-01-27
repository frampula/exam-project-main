import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import StartReviewPage from './pages/StartReviewPage/StartReviewPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import RoleHoc from './components/RoleHoc/RoleHoc';
import EventCountdownHoc from './components/EventCountdownHoc/EventCountdownHoc';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import HowItWorks from './pages/HowItWorks/HowItWorks';
import Events from './pages/Events/EventCountdown';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={PrivateHoc(EventCountdownHoc((Home)))} />
          <Route
            exact
            path="/login"
            component={OnlyNotAuthorizedUserHoc(LoginPage)}
          />
          <Route
            exact
            path="/registration"
            component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
          />
          <Route exact path="/payment" component={PrivateHoc(EventCountdownHoc((Payment)))} />
          <Route
            exact
            path="/startContest"
            component={PrivateHoc(EventCountdownHoc((StartContestPage)))}
          />
          <Route
            exact
            path='/startReview'
            component={PrivateHoc(RoleHoc(EventCountdownHoc((StartReviewPage, CONSTANTS.MODERATOR))))}
          />
          <Route
            exact
            path='/startContest/nameContest'
            component={PrivateHoc(EventCountdownHoc(ContestCreationPage), {
              contestType: CONSTANTS.NAME_CONTEST,
              title: 'Company Name',
            })}
          />
          <Route
            exact
            path="/startContest/taglineContest"
            component={PrivateHoc(EventCountdownHoc((ContestCreationPage)), {
              contestType: CONSTANTS.TAGLINE_CONTEST,
              title: 'TAGLINE',
            })}
          />
          <Route
            exact
            path="/how-it-works"
            component={PrivateHoc(HowItWorks)}
          />
          <Route exact path="/events" component={PrivateHoc(EventCountdownHoc(Events))} />
          <Route
            exact
            path="/startContest/logoContest"
            component={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.LOGO_CONTEST,
              title: 'LOGO',
            })}
          />
          <Route exact path="/dashboard" component={PrivateHoc(EventCountdownHoc(Dashboard))} />
          <Route
            exact
            path="/contest/:id"
            component={PrivateHoc(ContestPage)}
          />
          <Route exact path="/account" component={PrivateHoc(EventCountdownHoc((UserProfile)))} />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    );
  }
}

export default App;
