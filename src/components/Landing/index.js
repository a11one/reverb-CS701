import React from 'react';
import '../App/App.css';
import { Button, Container, Col, Row } from 'reactstrap';
import * as ROUTES from '../../constants/routes';
import MdMusicalNote from 'react-ionicons/lib/MdMusicalNote'
import MdMusicalNotes from 'react-ionicons/lib/MdMusicalNotes'
import IosHeadset from 'react-ionicons/lib/IosHeadset'
import IosMegaphone from 'react-ionicons/lib/IosMegaphone'

var row1Style = {
  marginLeft: '-140px'
};

var row2Style = {
  marginLeft: '250px'
};

var buttonStyle = {
  marginLeft: '253px'
};
const LandingPage = () => (
  <Container id="intro">
    <h1>Your Music Live Streaming Platform</h1>
    <Row style={row1Style}>
      <Col sm={{ size: 'auto', offset: 1 }}>
        <MdMusicalNote fontSize="60px" color="#ffc107" rotate={true} />
      </Col>
      <Col sm={{ size: 'auto', offset: 1 }}>
        <IosHeadset fontSize="60px" color="#ffc107" beat={true} />
      </Col>
      <Col sm={{ size: 'auto', offset: 1 }}>
        <IosMegaphone fontSize="60px" color="#ffc107" beat={true} />
      </Col>
      <Col sm={{ size: 'auto', offset: 1 }}>
        <MdMusicalNotes fontSize="60px" color="#ffc107" rotate={true} />
      </Col>
    </Row>
    <p style={row2Style}>Now for free</p>
    <Button href={ROUTES.SIGN_UP} style={buttonStyle} color="warning">Sign Up</Button>
  </Container>
);

export default LandingPage;
