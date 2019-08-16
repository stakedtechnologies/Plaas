import React from 'react';
import PropTypes from 'prop-types'
import {Col, Row, Container, Jumbotron} from 'react-bootstrap'
import './index.css';
import { withCookies, Cookies } from 'react-cookie';

class Deploy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="App">
      <Container fluid={false} className="Plaas-container">
        <Jumbotron className="Plaas-jumbtoron">
          <h1>Deploying Plapps</h1>
          <p>Let’s select Plasma application template.</p>
        </Jumbotron>
      </Container>
    </div>);
  }
}

export default withCookies(Deploy);
