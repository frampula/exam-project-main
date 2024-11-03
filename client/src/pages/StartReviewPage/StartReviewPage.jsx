import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getOffers,
  approveOffer,
  rejectOffer,
  setCurrentPage,
} from '../../store/slices/offersSlice';
import CONSTANTS from '../../constants';
import styles from './StartReviewPage.module.sass';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const StartReviewPage = (props) => {
  const { offers, currentPage, limit, haveMore } = props.offersStore;
  useEffect(() => {
    loadOffers();
  }, [currentPage]);

  const loadOffers = () => {
    const offset = (currentPage - 1) * limit;
    props.getOffers({
      requestData: {
        offset,
        limit,
        where: { status: CONSTANTS.OFFER_STATUS_ON_MODERATION },
      },
    });
  };

  const handlePageChange = (newPage) => {
    props.setCurrentPage(newPage);
  };

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
        <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button 
            disabled={!haveMore}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
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
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartReviewPage);
