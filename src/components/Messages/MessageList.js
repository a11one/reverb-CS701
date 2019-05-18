import React from 'react';

import MessageItem from './MessageItem';

const MessageList = ({
  authUser,
  username,
  messages,
  onComplete,
  streamSong,
  streamTitle,
  streamArtist,
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
        onComplete={onComplete}
      />
    ))}
  </ul>
);

export default MessageList;
