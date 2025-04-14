import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import styles from './Dialog.module.sass';

const Dialog = ({ userId }) => {
  const dispatch = useDispatch();
  const { messages, interlocutor, chatData } = useSelector(
    (state) => state.chatStore
  );

  const messagesEnd = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const getDialog = useCallback(() => {
    if (interlocutor?.id && chatData._id) {
      dispatch(
        getDialogMessages({
          interlocutorId: interlocutor.id,
          conversationId: chatData._id,
        })
      );
    }
  }, [dispatch, interlocutor?.id, chatData._id]);

  useEffect(() => {
    getDialog();
    scrollToBottom();
    return () => dispatch(clearMessageList());
  }, [getDialog, scrollToBottom, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();

    messages.forEach((message, i) => {
      const isOwnMessage = userId === message.sender;
      const isNewDate = !currentTime.isSame(message.createdAt, 'date');

      if (isNewDate) {
        messagesArray.push(
          <div key={`date-${message.createdAt}`} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );
        currentTime = moment(message.createdAt);
      }

      messagesArray.push(
        <div
          key={i}
          className={classNames(
            isOwnMessage ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
      );
    });

    return (
      <div className={styles.messageList}>
        {messagesArray}
        <div ref={messagesEnd} />
      </div>
    );
  };

  const blockMessage = () => {
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;

    if (blackList[userIndex]) {
      message = 'You block him';
    } else if (blackList.includes(true)) {
      message = 'He block you';
    }

    return <span className={styles.messageBlock}>{message}</span>;
  };

  if (!interlocutor || !chatData) return null;

  return (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      {chatData?.blackList?.includes(true) ? blockMessage() : <ChatInput />}
    </>
  );
};

export default Dialog;
