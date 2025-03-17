import http from '../interceptor';

export const registerRequest = (data) => http.post('registration', data);
export const loginRequest = (data) => http.post('login', data);
export const getUser = () => http.get('getUser');
export const updateContest = (data) => http.patch('updateContest', data);
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
export const downloadContestFile = (data) =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('pay', data.formData);
export const changeMark = (data) => http.patch('changeMark', data);
export const getPreviewChat = () => http.get('getPreview');
export const getDialog = (data) => http.get('getChat', { params: data });
export const dataForContest = (data) => http.get('dataForContest', { params: data });
export const cashOut = (data) => http.post('cashout', data);
export const updateUser = (data) => http.patch('updateUser', data);
export const newMessage = (data) => http.post('newMessage', data);
export const changeChatFavorite = (data) => http.post('favorite', data);
export const changeChatBlock = (data) => http.post('blackList', data);
export const getCatalogList = (data) => http.get('getCatalogs', { params: data });
export const addChatToCatalog = (data) =>
  http.post('addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const deleteCatalog = (data) => http.delete('deleteCatalog', { params: data });
export const removeChatFromCatalog = (data) =>
  http.delete('removeChatFromCatalog', { params: data }); 
export const changeCatalogName = (data) => http.patch('updateNameCatalog', data);
export const getCustomersContests = (data) =>
  http.get(
    'getCustomersContests',
    {params: {status: data.contestStatus, limit: data.limit, offset: data.offset }},
  );

export const getActiveContests = (data) => http.get('getAllContests', { params: data });

export const getOffers = ({ offset, limit, awardSort, where }) =>
  http.get('getOffers', {
    params: {
      offset,
      limit,
      awardSort,
      where,
    },
  });

export const rejectOffer = (data) => http.post('rejectOffer', data);
export const approveOffer = (data) => http.post('approveOffer', data);

export const getContestById = (data) =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
