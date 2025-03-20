import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-18-image-lightbox';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-18-image-lightbox/style.css';
import Error from '../../components/Error/Error';

const ContestPage = ({
  match,
  contestByIdStore,
  userStore,
  chatStore,
  getData,
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
}) => {
  useEffect(() => {
    getData({ contestId: match.params.id });
    return () => changeEditContest(false);
  }, [match.params.id, getData, changeEditContest]);

  const setOffersList = () => {
    return contestByIdStore.offers.length ? (
      contestByIdStore.offers.map((offer) => (
        <OfferBox
          key={offer.id}
          data={offer}
          needButtons={needButtons}
          setOfferStatus={setOfferStatus}
          contestType={contestByIdStore.contestData.contestType}
          date={new Date()}
        />
      ))
    ) : (
      <div className={styles.notFound}>There is no suggestion at this moment</div>
    );
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestByIdStore.contestData.User.id;
    const userId = userStore.data.id;
    return (
      contestCreatorId === userId &&
      contestByIdStore.contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const findConversationInfo = (interlocutorId) => {
    const { messagesPreview } = chatStore;
    const { id } = userStore.data;
    const participants = [id, interlocutorId].sort((a, b) => a - b);
    return (
      messagesPreview.find((msg) => isEqual(participants, msg.participants)) || {
        participants,
        _id: interlocutorId,
        blackList: [],
        favoriteList: [],
      }
    );
  };

  const goChat = () => {
    const { User } = contestByIdStore.contestData;
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;
  const { role } = userStore.data;

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.PUBLIC_URL}${imagePath}`}
          onCloseRequest={() => changeShowImage({ isShowOnFull: false, imagePath: null })}
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}><TryAgain getData={getData} /></div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}><Spinner /></div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => changeContestViewMode(true)}
                className={classNames(styles.btn, { [styles.activeBtn]: isBrief })}
              >
                Brief
              </span>
              <span
                onClick={() => changeContestViewMode(false)}
                className={classNames(styles.btn, { [styles.activeBtn]: !isBrief })}
              >
                Offer
              </span>
            </div>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <div className={styles.offersContainer}>
                {role === CONSTANTS.CREATOR && contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                  <OfferForm
                    contestType={contestData.contestType}
                    contestId={contestData.id}
                    customerId={contestData.User.id}
                  />
                )}
                {setOfferStatusError && <Error data={setOfferStatusError.data} status={setOfferStatusError.status} clearError={clearSetOfferStatusError} />}
                <div className={styles.offers}>{setOffersList()}</div>
              </div>
            )}
          </div>
          <ContestSideBar contestData={contestData} totalEntries={offers.length} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  contestByIdStore: state.contestByIdStore,
  userStore: state.userStore,
  chatStore: state.chatStore,
});

const mapDispatchToProps = {
  getData: getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);