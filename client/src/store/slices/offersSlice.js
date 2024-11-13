import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { decorateAsyncThunk, pendingReducer } from '../../utils/store';
import CONSTANTS from '../../constants';

const OFFERS_SLICE_NAME = 'offers';

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  moderatorFilter: {
    awardSort: 'asc'
  },
  haveMore: true,
  currentPage: 1,
  limit: 10,
};

export const getOffers = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/getOffers`,
  thunk: async ({requestData}) => {

    const { data } = await restController.getOffers(requestData)

    return data;
  },
});

export const rejectOffer = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/rejectOffer`,
  thunk: async ({ offerId, creatorId, contestId }, { dispatch, getState }) => {
    await restController.rejectOffer({ offerId, creatorId, contestId });
    const { currentPage, limit } = getState().offersStore;
    const offset = (currentPage - 1) * limit;
    dispatch(getOffers({ requestData: { offset, limit, where: { status: CONSTANTS.OFFER_STATUS_ON_MODERATION }} }));
  },
});

export const approveOffer = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/approveOffer`,
  thunk: async ({ offerId, creatorId, contestId }, { dispatch, getState }) => {
    await restController.approveOffer({ offerId, creatorId, contestId });
    const { currentPage, limit } = getState().offersStore;
    const offset = (currentPage - 1) * limit;
    dispatch(getOffers({ requestData: {offset, limit, where: { status: CONSTANTS.OFFER_STATUS_ON_MODERATION }} }));
  },
});


const reducers = {
  setNewModeratorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    moderatorFilter: payload,
  }),
  setCurrentPage: (state, { payload }) => {
    state.currentPage = payload;
  },
};

const extraReducers = builder => {
  builder.addCase(getOffers.pending, pendingReducer);
  builder.addCase(getOffers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = [...payload.offers];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getOffers.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.offers = [];
  });
};

const offersSlice = createSlice({
  name: OFFERS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = offersSlice;

export const {
  setNewModeratorFilter,
  setCurrentPage,
} = actions;

export default reducer;
