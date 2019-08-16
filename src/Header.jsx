import React from 'react';

import {
    Navbar,
    Nav,
    NavDropdown
  } from 'react-bootstrap';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parentChainName: "MockChain"
        }
        this.selectParentChain = this.selectParentChain.bind(this);
        this.parentChainName = this.parentChainName.bind(this);
    }

    selectParentChain(name) {
        console.log("Selected Mock!!");
        this.setState({parentChainName: name});
    }

    parentChainName() {
        return "ParentChain(" + this.state.parentChainName + ")";
    }

    render() {
        return (<Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Plasm as a Service</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown className="mr-auto" title={this.parentChainName()} id="nav-dropdown">
                <NavDropdown.Item onClick={this.selectParentChain.bind(this, "MockChain")}>MockChain</NavDropdown.Item>
                <NavDropdown.Item onClick={this.selectParentChain.bind(this, "PlasmChain(CommingSoon...)")}>PlasmChain(CommingSoon...)</NavDropdown.Item>
                <NavDropdown.Item onClick={this.selectParentChain.bind(this, "Edgeware(CommingSoon...)")}>Edgeware(ComingSoon...)</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">ParentChain List</NavDropdown.Item>
            </NavDropdown>
                <Nav>
                    <Nav.Link href="/console">Console</Nav.Link>
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