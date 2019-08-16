
import React from 'react';
import PropTypes from 'prop-types'
import {Button, ListGroup} from 'react-bootstrap'
import './index.css';

class CreateSteps extends React.Component {
    static propTypes={
        steps: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }  

    render() {
        var nextsteps = this.props.steps.map((step) => {
            return (
            <ListGroup.Item className="Plaas-step">
                {step}
            </ListGroup.Item>)
        });
        return (<ListGroup variant="flush">{nextsteps}</ListGroup>);
    }
}

class CreateStep extends React.Component {
    static propTypes={
        step: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }

    render() {
        if(!this.props.selected){
            return (
                <div>
                <h5>{this.props.step.name}</h5>
                <p>{this.props.step.description}</p></div>)
        }
        return (
            <div>
            <h5>{this.props.step.name}</h5>
            <p className="step-selected">{this.props.step.description}</p></div>)
    }
}

class CreateContinueButton extends React.Component {
    static propTypes={
        next:PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }  
    render() {
        return <Button variant="warning" onClick={this.props.next}>Continue</Button>
    }
}

class CreateBackButton extends React.Component {
    static propTypes={
        prev:PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }  
    render() {
        return <Button variant="secondary" onClick={this.props.prev}>Back</Button>
    }    
}

class CreateCancelButton extends React.Component {
    constructor(props) {
        super(props)
    }  
    render() {
        return <Button variant="light" href="/">Cancel</Button>
    }
}

export {CreateSteps, CreateStep, CreateContinueButton, CreateBackButton, CreateCancelButton};