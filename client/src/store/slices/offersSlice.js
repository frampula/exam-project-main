import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { decorateAsyncThunk, pendingReducer } from '../../utils/store';

const OFFERS_SLICE_NAME = 'offers';

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  moderatorFilter: {
    awardSort: 'asc'
  },
  haveMore: true,
};

export const getOffers = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/getOffers`,
  thunk: async (requestData) => {
    console.log('requestData', requestData);

    const { data } = await restController.getOffers(requestData)

    return data;
  },
});

export const rejectOffer = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/rejectOffer`,
  thunk: async ({ offerId, creatorId, contestId }) => {
    await restController.rejectOffer({offerId, creatorId, contestId})
  },
});

export const approveOffer = decorateAsyncThunk({
  key: `${OFFERS_SLICE_NAME}/approveOffer`,
  thunk: async ({ offerId, creatorId, contestId }) => {
    await restController.approveOffer({offerId, creatorId, contestId})
  },
});

const reducers = {
  clearOffersList: state => {
    state.error = null;
    state.offers = [];
  },
  setNewModeratorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    moderatorFilter: payload,
  }),
};

const extraReducers = builder => {
  builder.addCase(getOffers.pending, pendingReducer);
  builder.addCase(getOffers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = [...state.offers, ...payload.offers];
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
  clearOffersList,
  setNewModeratorFilter,
} = actions;

export default reducer;
