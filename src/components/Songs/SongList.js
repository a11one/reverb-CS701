import React from 'react';

import SongItem from './SongItem';

const SongList = ({
  authUser,
  songs,
  onEditSong,
  onRemoveSong,
}) => (
  <ul>
    {songs.map(song => (
      <SongItem
        authUser={authUser}
        key={song.uid}
        song={song}
        onEditSong={onEditSong}
        onRemoveSong={onRemoveSong}
      />
    ))}
  </ul>
);

export default SongList;
