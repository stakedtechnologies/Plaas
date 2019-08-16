import React from 'react';
import PropTypes from 'prop-types'
import {CreateSteps, CreateStep, CreateContinueButton, CreateCancelButton, CreateBackButton} from './CreateSteps';
import {Container, InputGroup, FormControl, Row, Col, ListGroup} from 'react-bootstrap'
import './index.css';
import { withCookies, Cookies } from 'react-cookie';
import MockManager from './MockExternalManager';

var steps = [
    {
        name: "Step 1",
        description: "Setting Parameter"
    },
    {
        name: "Step 2",
        description: "Confirm"
    }
]

class CreateCash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        step: 0,
        steps: null, // Array of Step Components
        params: {},
    }
    this.state.steps = <CreateSteps steps={steps.map((m, i) => {
        if(i == this.state.step){
            return <CreateStep step={m} selected={true} />         
        }
        return <CreateStep step={m} />
    })} />;

    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.updateSteps = this.updateSteps.bind(this);    
    this.updateState = this.updateState.bind(this);
  }

  updateState(params) {
    this.setState({params: params})
  }

  updateSteps(nowStep) {
        if(nowStep < 0) {
            window.location.href = "/started";
        } else if(nowStep >= steps.length) {
            var params = this.state.params;
            params.template = 'cash';
            MockManager.startDeploy(params);
            window.location.href = "/deploy/cash";            
        } else {
            this.setState({steps: <CreateSteps steps={steps.map((m, i) => {
                if(i == nowStep){
                    return <CreateStep step={m} selected={true} />         
                }
                return <CreateStep step={m} />
            })} />});
        }
  }

  prevClick() {
    var prevStep = this.state.step-1;
    this.setState({ step: prevStep })
    this.updateSteps(prevStep)
  }

  nextClick() {
    var nextStep = this.state.step+1;
    this.setState({ step: nextStep })
    this.updateSteps(nextStep)
  }

  render() {
    var main = <SettingParameter prams={this.state.params} update={this.updateState.bind(this)}/>
    if(this.state.step == 1) {
        main = <Confirm params={this.state.params}/>
    }
    return (<div className="App">
      <Container fluid={false} className="Plaas-container">
        <Row>
            <Col className="Plaas-steps" md="3">
                {this.state.steps}
            </Col>
            <Col className="Plass-steps-side">
            <h1>Create Plama Cash application</h1>
            <hr />
                {main}
            <Row className="button-row">
                <Col md="6"></Col>
                <Col mr="auto"><CreateCancelButton /></Col>
                <Col mr="auto"><CreateBackButton prev={this.prevClick.bind(this)}/></Col>
                <Col mr="auto"><CreateContinueButton next={this.nextClick.bind(this)}/></Col>
            </Row>
            </Col>
        </Row>
    </Container>
    </div>);
  }
}

class SettingParameter extends React.Component {
    static propTypes={
        update: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            applicationName: '',
            tokenName: '',
        }
        if(!!this.props.params) {
            this.setState({
                applicationName: this.props.params.applicationName,
                tokenName: this.props.params.tokenName,
            })
        }
        this.handleOnApplicationName = this.handleOnApplicationName.bind(this);
        this.handleOnTokenName = this.handleOnTokenName.bind(this);
    }  

    handleOnApplicationName(event) {
        var params = this.state;
        this.setState({applicationName: event.target.value});        
        params.applicationName = event.target.value;
        this.updateState(params)
    }

    handleOnTokenName(event) {
        var params = this.state;
        this.setState({tokenName: event.target.value});
        params.tokenName = event.target.value;
        this.updateState(params)
    }

    updateState(params) {
        this.props.update(params);
    }

    render() {
        return (
        <div>
            <label htmlFor="applicationName">Application name</label>               
            <InputGroup className="mb-3">
                <FormControl
                        placeholder="Enter a your application name."
                        aria-label="name"
                        aria-describedby="basic-addon2"
                        onChange={e => this.handleOnApplicationName(e)}
                        />
            </InputGroup>

            <label htmlFor="tokenName">Token name</label>               
            <InputGroup className="mb-3">
                <FormControl
                        placeholder="Enter a your token name."
                        aria-label="name"
                        aria-describedby="basic-addon2"   
                        onChange={e => this.handleOnTokenName(e)}                     
                        />
            </InputGroup>
            <p />
        </div>
        );
    }
}

class Confirm extends React.Component {
    static propTypes={
        params: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }  

    render() {
        return (
        <div>
            <ListGroup variant="flush">
                <ListGroup.Item className="Plaas-step">
                    <h5>Application name</h5>
                    {this.props.params.applicationName}
                </ListGroup.Item>
                <ListGroup.Item className="Plaas-step">
                    <h5>Token name</h5>
                    {this.props.params.tokenName}
                </ListGroup.Item>
            </ListGroup>
            <p />
        </div>
        );
    }
}

export default withCookies(CreateCash);
