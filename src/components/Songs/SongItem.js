import React, { Component } from 'react';
import { Button } from 'reactstrap';

class SongItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editSong: this.props.song.current_song,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editSong: this.props.song.current_song,
    }));
  };

  onChangeEditSong = event => {
    this.setState({ editSong: event.target.value });
  };

  onSaveEditSong = () => {
    this.props.onEditSong(this.props.song, this.state.editSong);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, song, onRemoveSong } = this.props;
    const { editMode, editSong } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editSong}
            onChange={this.onChangeEditSong}
          />
        ) : (
          <span>
            <strong>{song.userId}</strong> {song.current_song}
            {song.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === song.userId && (
          <span>
            {editMode ? (
              <span>
                <Button onClick={this.onSaveEditSong}>Save</Button>
                <Button onClick={this.onToggleEditMode}>Reset</Button>
              </span>
            ) : (
              <div>
                <Button onClick={this.onToggleEditMode}>Edit</Button>
              </div>
            )}

            {!editMode && (
              <Button
                type="button"
                onClick={() => onRemoveSong(song.uid)}
              >
                Delete
              </Button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default SongItem;
