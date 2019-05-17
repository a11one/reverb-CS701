import React, { Component } from 'react';
import { Button, Input, Form } from 'reactstrap';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';



class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.streamTitle,
      loading: false,
      messages: [],
      limit: 5,
      streamSong: props.streamSong,
      streamTitle: props.streamTitle,
      streamArtist: props.streamArtist,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  // onChangeText = event => {
  //   this.setState({ text: event.target.value });
  // };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      userName: authUser.username,
      streamSong: this.state.streamSong,
      streamTitle: this.state.streamTitle,
      streamArtist: this.state.streamArtist,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { text, messages, loading, streamSong, streamTile, streamArtist } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <Button type="button" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <Form inline>
            <Button
            value={text}
            onClick={this.onCreateMessage()}
            color="warning"
            >Stream Now
            </Button>
            <Button color="danger"> Stop Stream</Button>
            </Form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);

// <Form inline
//   onSubmit={event =>
//     this.onCreateMessage( authUser)
//   }
// >
// <Input
//   type="text"
//   // value={text}
//   // onChange={this.onChangeText}
// />
// <Button value={text} onClick={event=> this.onCreateMessage()}color="warning">Stream Now</Button>
// // <Input
//   type="text"
//   value={text}
//   onChange={this.onChangeText}
// />
// <Button type="submit">Send</Button>
// <Button color="warning">Stream Now</Button>
// <Button disable={isStreaming} color="danger"> Stop Stream</Button>
