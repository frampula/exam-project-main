import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCatalogList, removeChatFromCatalog } from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = () => {
  const dispatch = useDispatch();
  const { chatStore, userStore } = useSelector(state => ({
    chatStore: state.chatStore,
    userStore: state.userStore
  }));

  const { catalogList, isShowChatsInCatalog, currentCatalog, messagesPreview } = chatStore;
  const { id } = userStore.data;

  useEffect(() => {
    dispatch(getCatalogList());
  }, [dispatch]);

  const handleRemoveChatFromCatalog = (event, chatId) => {
    const { id } = currentCatalog;
    dispatch(removeChatFromCatalog({ chatId, catalogId: id }));
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const dialogsInCatalog = [];
    for (let i = 0; i < messagesPreview.length; i++) {
      for (let j = 0; j < currentCatalog.chats.length; j++) {
        if (currentCatalog.chats[j] === messagesPreview[i]._id) {
          dialogsInCatalog.push(messagesPreview[i]);
        }
      }
    }
    return dialogsInCatalog;
  };

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={handleRemoveChatFromCatalog}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;
