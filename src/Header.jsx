import React from 'react';

import {
    Navbar,
    Nav,
    NavDropdown
} from 'react-bootstrap';

import DefaultManager from './ExternalManager';

const chains = [
    {
        name: "MockChain",
    },
    {
        name: "PlasmChain(CommingSoon...)",
    },
    {
        name: "Edgeware(CommingSoon...)",
    },    
]

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parentChainName: chains[0].name
        }
        this.selectParentChain = this.selectParentChain.bind(this);
        this.parentChainName = this.parentChainName.bind(this);
    }

    selectParentChain(name) {
        this.setState({parentChainName: name});
    }

    parentChainName() {
        return "ParentChain(" + this.state.parentChainName + ")";
    }

    render() {
        const chainList = chains.map(chain => {
            return <NavDropdown.Item onClick={this.selectParentChain.bind(this, chain.name)}>{chain.name}</NavDropdown.Item>
        })
        const consoles = DefaultManager.getPlappsNames().map(plapp => {
            return <NavDropdown.Item href={"/console/" + plapp}>{plapp}</NavDropdown.Item>
        })
        return (<Navbar expand="lg" className="navbar-dark bg-dark Plaas-header">
            <Navbar.Brand href="/">Plasm as a Service</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown className="mr-auto" title={this.parentChainName()} id="nav-dropdown">
                {chainList}
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">ParentChain List</NavDropdown.Item>
            </NavDropdown>
                <Nav>
                    <NavDropdown className="mr-auto" title="Console" id="nav-dropdown">
                        {consoles}
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="https://stake.co.jp">Stake Technologies</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>);
    }
}

export default Header;