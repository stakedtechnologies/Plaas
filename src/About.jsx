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
                    <p className="About"> Plasm as a Service (PlaaS) will be to easy deploying plasma application.</p>
                    <p className="About"> We hope this site is useful when you try to build applications on Substrate and Polkadot.</p>
                    <p className="About"> If you want to add your SRML, feel free to fill out the application form.</p>
            </Container>
        </div>);
      }
}

export default About;