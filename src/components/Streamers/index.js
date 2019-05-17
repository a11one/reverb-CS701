import React from 'react';
import { compose } from 'recompose';
import '../App/App.css';
import { Button, Container, Col, Row } from 'reactstrap';
import MusicPlayer from '../MusicPlayer/index.js'


const StreamersPage = () => (
  <Container style={{color: "white"}} id="intro">
    <h1>Music Streamers</h1>
    <Row>
      <Col>userId: "", songName= ""  <Button color="warning" size="sm">Listen</Button></Col>
    </Row>
    <br />
    <Row>
      <Col>userId: "", songName= ""  <Button color="warning" size="sm">Listen</Button></Col>
    </Row>
    <br />

    <MusicPlayer />
  </Container>
);



export default StreamersPage;
