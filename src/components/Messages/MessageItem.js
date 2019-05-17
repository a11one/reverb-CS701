import React, { Component } from 'react';
import { Button } from 'reactstrap';

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
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{message.userName}</strong> {message.text}
            {message.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === message.userId && (
          <span>
            {editMode ? (
              <span>
                <Button onClick={this.onSaveEditText}>Save</Button>
                <Button onClick={this.onToggleEditMode}>Reset</Button>
              </span>
            ) : (
              <div>
                <Button color= "warning" onClick={this.onToggleEditMode}>Stream Now</Button>
              </div>
            )}

            {!editMode && (
              <Button
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
                color="danger"
              >
                Stop Stream
              </Button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default MessageItem;
