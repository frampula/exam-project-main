import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getOffers,
  approveOffer,
  rejectOffer,
} from '../../store/slices/offersSlice';
import CONSTANTS from '../../constants';
import styles from './StartReviewPage.module.sass';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const StartReviewPage = (props) => {
  const { offers } = props.offersStore;

  // console.log('offers ---> ', offers);

  useEffect(() => {
    props.getOffers({
      requestData: {
        offset: 0,
        where: { status: CONSTANTS.OFFER_STATUS_ON_MODERATION },
      },
    });
  }, []);

  const onApprove = (offer) => {
    const { contestId, id: offerId, userId } = offer;

    props.approveOffer({ contestId, offerId, userId });
  };

  const onReject = (offer) => {
    const { contestId, id: offerId, userId } = offer;

    props.rejectOffer({ contestId, offerId, userId });
  };

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div className={styles.offers}>
          {offers.map((offer) => (
            <div className={styles.offer} key={offer.id}>
              <div className={styles.offerOwner}>
                <h5>
                  <b>Type:</b> {offer.Contest.contestType}
                </h5>
                <p>
                  <b>Title:</b> {offer.Contest.title}
                </p>
                <p>
                  <b>Target:</b> {offer.Contest.targetCustomer}
                </p>
              </div>
              <div className={styles.offerContent}>{offer.text}</div>
              <div className={styles.offerControls}>
                <button
                  className={styles.buttonApprove}
                  onClick={() => onApprove(offer)}
                >
                  Approve
                </button>
                <button
                  className={styles.offerReject}
                  onClick={() => onReject(offer)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { offersStore } = state;

  return { offersStore };
};

const mapDispatchToProps = (dispatch) => ({
  getOffers: (bundle) => dispatch(getOffers(bundle)),
  approveOffer: (bundle) => dispatch(approveOffer(bundle)),
  rejectOffer: (bundle) => dispatch(rejectOffer(bundle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartReviewPage);
