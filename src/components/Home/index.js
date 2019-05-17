import React, {Component} from 'react';
import { compose } from 'recompose';
import '../App/App.css';
import { Button, Container, Row } from 'reactstrap';
import MusicPlayer from '../MusicPlayer/index.js'

import { withAuthorization } from '../Session';
import Messages from '../Messages';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: '',
      currentArtist:'',
      currentTitle:'',
      currentTime: 0,
      isStreaming: false,
    };
    this.handleSongChange = this.handleSongChange.bind(this);
  }
  async handleSongChange(newSong,newTitle,newArtist) {
    await this.setState({
      currentSong: newSong,
      currentTitle: newTitle,
      currentArtist: newArtist,
    });
    console.log(this.state.currentTitle);
  }


  render() {
    return(

        <Container id="intro">
          <h1>Your Music Player</h1>
          <MusicPlayer
          currentSong={this.state.currentSong}
          currentTitle={this.state.currentTitle}
          currentArtist={this.state.currentArtist}
          currentTime={this.state.currentTime}
          complete = {(newSong,newTitle,newArtist) => this.handleSongChange(newSong,newTitle,newArtist)}
          />
          <br />
          <Messages
          streamSong={this.state.currentSong}
          streamTitle={this.state.currentTitle}
          streamArtist={this.state.currentArtist}
          streamTime={this.state.currentTime}
          complete2 = {(streamSong,streamTitle,streamArtist,streamTime) => this.handleSongChange(streamSong,streamTitle,streamArtist)}
          />
        </Container>
      )
    }

  }

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(HomePage);
