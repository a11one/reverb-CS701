import React from 'react';

import MessageItem from './MessageItem';

const MessageList = ({
  authUser,
  username,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        authUser={authUser}
        username={authUser.userName}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default MessageList;
