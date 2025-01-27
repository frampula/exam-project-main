import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviewChat } from '../../../../store/slices/chatSlice';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = () => {
  const dispatch = useDispatch();
  const { messagesPreview, userId } = useSelector((state) => state.chatStore);

  useEffect(() => {
    dispatch(getPreviewChat());
  }, [dispatch]);

  return <DialogList preview={messagesPreview} userId={userId} />;
};

export default DialogListContainer;
