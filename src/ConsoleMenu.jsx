import React from 'react';
import PropTypes from 'prop-types'
import {Button, ListGroup} from 'react-bootstrap'
import './index.css';

class ConsoleMenu extends React.Component {
    static propTypes={
        columns: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }

    render() {
        var columns = this.props.columns.map((step) => {
            return (
            <ListGroup.Item className="Plaas-step">
                {step}
            </ListGroup.Item>)
        });
        return (<ListGroup variant="flush">{columns}</ListGroup>);
    }
}

class ConsoleColumn extends React.Component {
    static propTypes={
        column: PropTypes.object.isRequired,
        onClick: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div onClick={this.props.onClick} className={this.props.selected?"fly step-selected":"fly"}>
            <h5>{this.props.column.name}</h5>
            <p>{this.props.column.description}</p></div>);
    }
}

export {ConsoleColumn, ConsoleMenu};