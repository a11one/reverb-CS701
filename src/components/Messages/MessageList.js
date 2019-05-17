import React from 'react';

import MessageItem from './MessageItem';

const MessageList = ({
  authUser,
  username,
  messages,
  streamTitle,
  onEditMessage,
  onRemoveMessage,
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        authUser={authUser}
        username={authUser.userName}
        streamTitle={message.streamTitle}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default MessageList;
