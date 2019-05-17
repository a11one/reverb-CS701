import React, { Component } from 'react';
import { Button, FormGroup, Input, Form } from 'reactstrap';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import SongList from './SongList';

class Songs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streaming_song: '',
      loading: false,
      songs: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForSongs();
  }

  onListenForSongs = () => {
    this.setState({ loading: true });

    this.props.firebase
      .songs()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const songObject = snapshot.val();

        if (songObject) {
          const songList = Object.keys(songObject).map(key => ({
            ...songObject[key],
            uid: key,
          }));

          this.setState({
            songs: songList,
            loading: false,
          });
        } else {
          this.setState({ songs: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.songs().off();
  }

  onChangeText = event => {
    this.setState({ streaming_song: event.target.value });
  };

  onCreateSong = (event, authUser) => {
    this.props.firebase.songs().push({
      streaming_song: this.state.streaming_song,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ streaming_song: '' });

    event.preventDefault();
  };

  onEditSong = (song, streaming_song) => {
    const { uid, ...songSnapshot } = song;

    this.props.firebase.song(song.uid).set({
      ...songSnapshot,
      streaming_song,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveSong = uid => {
    this.props.firebase.song(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForSongs,
    );
  };

  render() {
    const { streaming_song, songs, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && songs && (
              <Button type="button" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {songs && (
              <SongList
                authUser={authUser}
                songs={songs}
                onEditSong={this.onEditSong}
                onRemoveSong={this.onRemoveSong}
              />
            )}

            {!songs && <div>There are no songs ...</div>}

            <Form inline
              onSubmit={event =>
                this.onCreateSong(event, authUser)
              }
            >
              <Input
                type="text"
                value={streaming_song}
                onChange={this.onChangeText}
              />
              <Button type="submit">Send</Button>
            </Form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
  }

  export default withFirebase(Songs);
