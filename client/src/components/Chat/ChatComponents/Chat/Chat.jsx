import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import DialogListContainer from '../../DialogComponents/DialogListContainer/DialogListContainer';
import styles from './Chat.module.sass';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from '../../../../store/slices/chatSlice';
import { chatController } from '../../../../api/ws/socketController';
import CONSTANTS from '../../../../constants';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import ChatError from '../../../ChatError/ChatError';

const Chat = () => {
  const dispatch = useDispatch();
  const chatStore = useSelector((state) => state.chatStore);
  const userStore = useSelector((state) => state.userStore);
  const { id } = userStore.data;

  const {
    isExpanded,
    isShow,
    isShowCatalogCreation,
    error,
    chatMode,
    isShowChatsInCatalog,
  } = chatStore;

  const {
    NORMAL_PREVIEW_CHAT_MODE,
    FAVORITE_PREVIEW_CHAT_MODE,
    BLOCKED_PREVIEW_CHAT_MODE,
    CATALOG_PREVIEW_CHAT_MODE,
  } = CONSTANTS;

  useEffect(() => {
    chatController.subscribeChat(id);
    dispatch(getPreviewChat());

    return () => {
      chatController.unsubscribeChat(id);
    };
  }, [dispatch, id]);

  const renderDialogList = () => (
    <div>
      {isShowChatsInCatalog && <CatalogListHeader />}
      {!isShowChatsInCatalog && (
        <div className={styles.chatHeader}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
        </div>
      )}
      {!isShowChatsInCatalog && (
        <div className={styles.buttonsContainer}>
          <span
            onClick={() => dispatch(setPreviewChatMode(NORMAL_PREVIEW_CHAT_MODE))}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE,
            })}
          >
            Normal
          </span>
          <span
            onClick={() => dispatch(setPreviewChatMode(FAVORITE_PREVIEW_CHAT_MODE))}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === FAVORITE_PREVIEW_CHAT_MODE,
            })}
          >
            Favorite
          </span>
          <span
            onClick={() => dispatch(setPreviewChatMode(BLOCKED_PREVIEW_CHAT_MODE))}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === BLOCKED_PREVIEW_CHAT_MODE,
            })}
          >
            Blocked
          </span>
          <span
            onClick={() => dispatch(setPreviewChatMode(CATALOG_PREVIEW_CHAT_MODE))}
            className={classNames(styles.button, {
              [styles.activeButton]: chatMode === CATALOG_PREVIEW_CHAT_MODE,
            })}
          >
            Catalog
          </span>
        </div>
      )}
      {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
        <CatalogListContainer />
      ) : (
        <DialogListContainer />
      )}
    </div>
  );

  return (
    <div
      className={classNames(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={() => dispatch(getPreviewChat())} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? <Dialog userId={id} /> : renderDialogList()}
      <div
        className={styles.toggleChat}
        onClick={() => dispatch(changeChatShow())}
      >
        {isShow ? 'Hide Chat' : 'Show Chat'}
      </div>
    </div>
  );
};

export default Chat;
