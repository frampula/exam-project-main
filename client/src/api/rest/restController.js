import http from '../interceptor';

/**
 * =====================================================
 * АВТОРИЗАЦИЯ И УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
 * =====================================================
 */

// GET
export const getUser = () => http.get('getUser');

// POST
export const registerRequest = (data) => http.post('registration', data);
export const loginRequest = (data) => http.post('login', data);

// PATCH
export const updateUser = (data) => http.patch('updateUser', data);

/**
 * =====================================================
 * УПРАВЛЕНИЕ КОНТЕСТАМИ
 * =====================================================
 */

// GET
export const getContestById = (data) =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
export const getCustomersContests = (data) =>
  http.get(
    'getCustomersContests',
    {params: {status: data.contestStatus, limit: data.limit, offset: data.offset }},
  );
export const getActiveContests = (data) => http.get('getAllContests', { params: data });
export const dataForContest = (data) => http.get('dataForContest', { params: data });

// PATCH
export const updateContest = (data) => http.patch('updateContest', data);

/**
 * =====================================================
 * УПРАВЛЕНИЕ ПРЕДЛОЖЕНИЯМИ (OFFERS)
 * =====================================================
 */

// GET
export const getOffers = ({ offset, limit, awardSort, where }) =>
  http.get('getOffers', {
    params: {
      offset,
      limit,
      awardSort,
      where,
    },
  });

// POST
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
export const rejectOffer = (data) => http.post('rejectOffer', data);
export const approveOffer = (data) => http.post('approveOffer', data);

// PATCH
export const changeMark = (data) => http.patch('changeMark', data);

/**
 * =====================================================
 * РАБОТА С ФАЙЛАМИ
 * =====================================================
 */

// GET
export const downloadContestFile = (data) =>
  http.get(`downloadFile/${data.fileName}`);

/**
 * =====================================================
 * ФИНАНСОВЫЕ ОПЕРАЦИИ
 * =====================================================
 */

// POST
export const payMent = (data) => http.post('pay', data.formData);
export const cashOut = (data) => http.post('cashout', data);

/**
 * =====================================================
 * ЧАТ И СООБЩЕНИЯ
 * =====================================================
 */

// GET
export const getPreviewChat = () => http.get('getPreview');
export const getDialog = (data) => http.get('getChat', { params: data });

// POST
export const newMessage = (data) => http.post('newMessage', data);
export const changeChatFavorite = (data) => http.post('favorite', data);
export const changeChatBlock = (data) => http.post('blackList', data);

/**
 * =====================================================
 * КАТАЛОГИ
 * =====================================================
 */

// GET
export const getCatalogList = (data) => http.get('getCatalogs', { params: data });

// POST
export const createCatalog = (data) => http.post('createCatalog', data);
export const addChatToCatalog = (data) =>
  http.post('addNewChatToCatalog', data);

// PATCH
export const changeCatalogName = (data) => http.patch('updateNameCatalog', data);

// DELETE
export const deleteCatalog = (data) => http.delete('deleteCatalog', { params: data });
export const removeChatFromCatalog = (data) =>
  http.delete('removeChatFromCatalog', { params: data });
