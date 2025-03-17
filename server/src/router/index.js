const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const offersController = require('../controllers/offersController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../middlewares/fileUpload');
const router = express.Router();

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

router.get(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest,
);

router.post(
  '/pay',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

router.get(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests,
);

router.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

router.get(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests,
);

router.get(
  '/getUser',
  checkToken.checkAuth,
);

router.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  contestController.downloadFile,
);

router.patch(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest,
);

router.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  offersController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  offersController.setOfferStatus,
);

router.get(
  '/getOffers',
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  offersController.getOffers,
);

router.post(
  '/approveOffer',
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  offersController.approveOfferByModerator,
);

router.post(
  '/rejectOffer',
  checkToken.checkToken,
  basicMiddlewares.onlyForModerator,
  offersController.rejectOfferByModerator,
);

router.patch(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark,
);

router.patch(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);

router.post(
  '/cashout',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout,
);

router.post(
  '/newMessage', 
  checkToken.checkToken,
  chatController.addMessage,
);

router.get(
  '/getChat', 
  checkToken.checkToken,
  chatController.getChat,
);

router.get(
  '/getPreview', 
  checkToken.checkToken,
  chatController.getPreview,
);

router.post(
  '/blackList', 
  checkToken.checkToken,
  chatController.blackList,
);

router.post(
  '/favorite', 
  checkToken.checkToken,
  chatController.favoriteChat,
);

router.post( 
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);

router.patch(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);

router.post( 
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);

router.delete( 
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);

router.delete( 
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);

router.get( 
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);

module.exports = router;
