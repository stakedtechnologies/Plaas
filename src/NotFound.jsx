import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap'

class NotFound extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (<div className="App">
            <Container fluid={false} className="Plaas-container">
                <Jumbotron className="Plaas-jumbtoron">
                <h1>404 Not Found</h1>
                <p>This page is coming soon or doesn't exist.</p>
                </Jumbotron>
            </Container>
        </div>);
      }
}

export default NotFound;