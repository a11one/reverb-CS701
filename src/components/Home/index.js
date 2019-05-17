import React, {Component} from 'react';
import { compose } from 'recompose';
import '../App/App.css';
import { Button, Container, Row } from 'reactstrap';
import MusicPlayer from '../MusicPlayer/index.js'

//import { withAuthorization, withEmailVerification } from '../Session';
import { withAuthorization } from '../Session';
import Messages from '../Messages';
//import Songs from '../Songs';



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
  handleSongChange(newSong,newTitle,newArtist,newTime) {
    this.setState({
      currentSong: newSong,
      currentTitle: newTitle,
      currentArtist: newArtist,
      currentTime: newTime,
    });

    console.log("YEEERRRRRR");
    console.log(this.state.currentSong);
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
          complete = {(newSong,newTitle,newArtist,newTime) => this.handleSongChange(newSong,newTitle,newArtist,newTime)}
          />
          <br />
          <Messages
          currentSong={this.state.currentSong}
          currentTitle={this.state.currentTitle}
          currentArtist={this.state.currentArtist}
          currentTime={this.state.currentTime}
          complete = {(streamSong,streamTitle,streamArtist,streamTime) => this.handleSongChange(streamSong,streamTitle,streamArtist,streamTime)}
          />
        </Container>
      )
    }

  }

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(HomePage);
