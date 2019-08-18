import React from 'react';
import PropTypes from 'prop-types'
import {ConsoleMenu, ConsoleColumn} from './ConsoleMenu';
import {Container, Table, FormControl, Row, Col, ListGroup, Jumbotron} from 'react-bootstrap'
import './index.css';
import { withCookies, Cookies } from 'react-cookie';
import DefaultManager from './ExternalManager';
import { Config } from '@jest/types';
import { throwStatement } from '@babel/types';

var menu = [
    {
        name: "Configure",
        description: "Config of Plapp"
    },
    {
        name: "State",
        description: "State of Plapp"
    },
]

class Console extends React.Component {
    static propTypes={
        match: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            menu: null, // Array of Step Components
        }
        console.log(props)
        this.makeConsoleMenu = this.makeConsoleMenu.bind(this);
        this.state.menu = this.makeConsoleMenu(this.state.step);

        this.updateStep = this.updateStep.bind(this);
        this.params = DefaultManager.getPlappsParams(props.match.params.plappname);
        console.log('params', this.params)
    }

    makeConsoleMenu(nowStep) {
        return  <ConsoleMenu columns={menu.map((m, i) => {
            if(i == nowStep){
                return <ConsoleColumn column={m} onClick={this.updateStep.bind(this, i)} selected={true} />
            }
            return <ConsoleColumn column={m} onClick={this.updateStep.bind(this, i)} />
        })} />
    }

    updateStep(step) {
        console.log('updateStep', step)
        this.setState({step: step})
        this.state.menu = this.makeConsoleMenu(step);
    }

    makeMain(nowStep) {
        switch (nowStep) {
            case 0:
                return <Configure params={this.params} />;
            case 1:
                return <State params={this.params} />;
        }
    }

    render() {
        const main = this.makeMain(this.state.step);
        return (<div className="App">
            <Container fluid={false} className="Plaas-container">
            <Jumbotron className="Plaas-jumbtoron">
                <h1>Console</h1>
            </Jumbotron>
            <Row>
                <Col className="Plaas-steps" md="3">
                    {this.state.menu}
                </Col>
                <Col className="Plass-steps-side" md="9">
                    {main}
                </Col>
            </Row>
        </Container>
        </div>);
    }
}

class Configure extends React.Component {
    static propTypes={
        params: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
    }

    render() {
        const params = Object.entries(this.props.params).map(([key,value], _) => {
            return <tr><td>{key}</td><td>{value}</td></tr>
        })
        return(<Container>
            <h2>Configure</h2>
            <hr />
            <Table striped bordered hover variant="dark">
                <tbody>
                    {params}
                </tbody>
            </Table>
        </Container>)
    }
}

var stateMenu = [
    {
        title: "Contract",
        state: {
            current_block_number: DefaultManager.getCurrentBlockNumberAtContract.bind(DefaultManager),
            current_block: DefaultManager.getContractCurrentBlockAtContract.bind(DefaultManager),
        }
    },
    {
        title: "ChildChain",
        state: {
            current_block_number: DefaultManager.getContractCurrentBlockNumberAtChildChain.bind(DefaultManager),
            current_block: DefaultManager.getCurrentBlockAtChildChain.bind(DefaultManager),
        }
    },
];

const updateSpan = 10000;

class State extends React.Component {
    static propTypes={
        params: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.makeTable = this.makeTable.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            table: this.makeTable()
        }
    }

    componentWillMount() {
        this.onUpdate();
    }

    makeTable () {
        return stateMenu.map((st, _) => {
            const head = (<tr>
                <th colSpan="2">{st.title}</th>
                </tr>);
            const body = Object.entries(st.state).map(([key, fn],_) => {
                return <tr><td>{key}</td><td>{fn(this.props.params.applicationName)}</td></tr>
            });
            console.log('commit!')
            return (<Table bordered hover variant="dark">
                <thead>{head}</thead>
                <tbody>{body}</tbody>
            </Table>)
        })
    }

    onUpdate() {
        this.setState({table: this.makeTable()});
        setTimeout(() => {this.onUpdate()}, updateSpan);
    }

    render() {
        return(<Container>
            <h2>State</h2>
            <hr />
            {this.state.table}
        </Container>)
    }
}

export default withCookies(Console);
