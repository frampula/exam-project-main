import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviewChat } from '../../../../store/slices/chatSlice';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = () => {
  const dispatch = useDispatch();

  const { chatStore, userStore } = useSelector(state => ({
    chatStore: state.chatStore,
    userStore: state.userStore
  }));

  const { messagesPreview } = chatStore;
  const { id } = userStore.data;

  useEffect(() => {
    dispatch(getPreviewChat());
  }, [dispatch]);

  return <DialogList preview={messagesPreview} userId={id} />;
};

export default DialogListContainer;
