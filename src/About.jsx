import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap'

class About extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (<div className="App">
            <Container fluid={false} className="Plaas-container">
                <Jumbotron className="Plaas-jumbtoron">
                <h1>About</h1>
                </Jumbotron>
                <hr />
                    <p className="About"> PlaaS is a tool to deploy plasma applications easily.</p>
                    <p className="About"> We hope this site is useful when you try to build Plasma applications on Substrate with Plasm.</p>                    
            </Container>
        </div>);
      }
}

export default About;