import React from 'react';
import PropTypes from 'prop-types'
import {Col, Row, Container, Jumbotron, Button} from 'react-bootstrap'
import './index.css';
import { withCookies, Cookies } from 'react-cookie';
import DefaultManager from './ExternalManager';

import check from './check-circle-regular.svg';
import wait from './clock-regular.svg';
import sync from './circle-notch-solid.svg'

const deploys = [
    "Contract",
    "ChildChain",
    "Operator",
    "GenesisAccounts"
];

const updateSpan = 1000;

class Deploy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        progress: [0,0,0,0],
        finished: false,
        appName: DefaultManager.getDeployAppName(),
    }
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillMount() {
    setTimeout(() => {
        this.onUpdate()
    }, updateSpan);
  }

  onUpdate() {
    var progress = DefaultManager.getProgress();
    console.log(progress);
    this.setState({progress: progress});

    if(progress[0]==3 && progress[1]==3 && progress[2]==3 && progress[3]==3) {
        DefaultManager.finishDeploy();
        this.setState({finished: true});
        return; 
    }
    setTimeout(() => {
        this.onUpdate()
    }, updateSpan);
  }

  render() {
    var states = this.state.progress.map((st,i) => 
    <Col>
        <center>
        <StateMark state={st} />
        <hr />
        <h2>{deploys[i]}</h2>
        </center>
    </Col>);
    return (<div className="App">
      <Container fluid={false} className="Plaas-container">
        <Jumbotron className="Plaas-jumbtoron">
          <h1>Deploying Plapps</h1>
          <p>Application : {this.state.appName}</p>
        </Jumbotron>
        <hr />
        <Row className="progresses">
            {states}
        </Row>
      </Container>
      <p />
      <GoToConsoleButton finished={this.state.finished} appName={this.state.appName} />
    </div>);
  }
}

class StateMark extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        if(this.props.state == 0) {
            return <div className="pg-wait-img" />
        } else if(this.props.state == 1){
            return <div className="pg-doing-img" />
        } else {
            return <div className="pg-passed-img" />
        }
    }
}

class GoToConsoleButton extends React.Component {
    static propTypes={
        finished: PropTypes.object.isRequired,
        appName: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
    }  
    render() {
        return <Button variant="warning" href={"/console/"+this.props.appName} disabled={!this.props.finished}>Go To Console</Button>
    }
}

export default withCookies(Deploy);
