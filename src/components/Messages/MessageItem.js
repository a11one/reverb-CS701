import React, { Component } from 'react';
import { Button } from 'reactstrap';

const fontStyle = {
  color: 'white'
}

const nameStyle = {
  color: '#ffc107'
}
class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: this.props.message.text });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  onComplete = () => {
    this.props.onComplete(this.props.message.streamSong, this.props.message.streamTitle, this.props.message.streamArtist);
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li style={fontStyle}>
        <span>
          <strong style={nameStyle}>{message.userName}</strong> {message.streamTitle} by {message.streamArtist}
          {message.editedAt && <span>(Edited)</span>}
        </span>

        {authUser.uid === message.userId && (
          <span>
            {' '}
              <Button
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
                color="danger"
              >
                Stop Stream
              </Button>
          </span>
        )}

        {authUser.uid !== message.userId && (
          <span>{' '}<Button onClick={this.onComplete}>Listen</Button>
          </span>
        )}
      </li>
    );
  }
}

export default MessageItem;
