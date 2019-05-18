import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row } from 'reactstrap';


class MusicPlayer extends Component {
    constructor(props) {
    super(props);
    this.state = {
      currentSong: props.currentSong,
      currentTitle: props.currentTitle,
      currentArtist: props.currentArtist,
    }
    this.changeSong = this.changeSong.bind(this);
  }
  async changeSong(songLocation, songTitle, songArtist) {
    await this.setState({
      currentSong: songLocation,
      currentTitle: songTitle,
      currentArtist: songArtist,
    });
    document.getElementById("music-player").pause();
    document.getElementById("music-player").setAttribute('src', this.state.currentSong);
    document.getElementById("music-player").load();
    document.getElementById("music-player").play();
    this.props.complete(songLocation, songTitle, songArtist);

  }

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        console.log('Setting state');
        return {
          unseen: "does not display",
          currentSong: this.props.currentSong,
          currentTitle: this.props.currentTitle,
          currentArtist: this.props.currentArtist,
      }
    });
    }, 1000);
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentSong !== prevProps.currentSong) {
      this.changeSong(this.props.currentSong, this.props.currentTitle, this.props.currentArtist)
    }
  }

  render() {
    console.log("title of state is", this.state.currentTitle)
    console.log("title of props is", this.props.currentTitle)
    return (
      <div>
      <Row>
          <audio id="music-player" controls>
            <source src={this.state.currentSong}/>
          </audio>

      </Row>
      <br />
      <br />
      <Button onClick={() => {
        this.changeSong('https://firebasestorage.googleapis.com/v0/b/reverb-9081f.appspot.com/o/rizkyrilos%20-%20Queen%20-%20Bohemian%20Rhapsody.mp3?alt=media&token=56ed2628-668d-4546-a657-692f4d51899e','Bohemian Rhapsody','Queen')
      }}>Bohemian Rhapsody</Button>
      <div />
      <Button onClick={()=> {
        this.changeSong('https://firebasestorage.googleapis.com/v0/b/reverb-9081f.appspot.com/o/Skrillex%20%26%20Poo%20Bear%20-%20Would%20You%20Ever.mp3?alt=media&token=1de62308-3d33-44cc-95aa-443ff5953d2a', 'Would You Ever','Skrillex')
      }}>Would You Ever</Button>
      <div />
      <Button onClick={() => {
        this.changeSong('https://firebasestorage.googleapis.com/v0/b/reverb-9081f.appspot.com/o/T%C3%BClpa%20-%20Lullaby%20for%20weary%20eyes%20(No.%201).mp3?alt=media&token=7e5e8910-a89c-4be0-af80-6263f34120ba','Lullaby for Weary Eyes #1','Tülpa')
      }}>Lullaby for Weary Eyes #1</Button>
      <div />
      <Button onClick={()=> {
        this.changeSong('https://firebasestorage.googleapis.com/v0/b/reverb-9081f.appspot.com/o/quickly%20quickly%20-%20if%20you%20only%20knew.mp3?alt=media&token=e4d62c3b-f7ee-4db4-ada8-14aaf868afb8', 'If You Only Knew','Quickly Quickly')
      }}>If You Only Knew</Button>
      </div>
      );
  }
}

MusicPlayer.propTypes = {
  currentSong: PropTypes.string,
}
export default MusicPlayer
