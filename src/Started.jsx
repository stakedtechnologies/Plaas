import React from 'react';
import PropTypes from 'prop-types'
import {Col, Row, Container, Jumbotron} from 'react-bootstrap'
import './index.css';

var templates =[
    {
        name: "Default(Plasma Cash)",
        link: "/create/cash",
        descripstion: "Create default Plasma Apllication. Same is Plamsa Cash."
    },
    {
        name: "Custom",
        link: "/404.html",
        descripstion: "Create custom plasma application. You can create original plapps. Comming Soon..."
    }
];

class Started extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [], //Array of Card Components
      selector: {}, // Selection of plapps mode
      modalIsOpen: false
    }
    this.state.cards = templates.map((m) => <OneCard model={m} />);
  }

  render() {
    return (<div className="App">
      <Container fluid={false} className="Plaas-container">
        <Jumbotron className="Plaas-jumbtoron">
          <h1>Started Plapps</h1>
          <p>Let’s select Plasma application template.</p>
        </Jumbotron>
        <Row className="Plaas-templates">
          <ShowCards cards={this.state.cards} />
        </Row>
      </Container>
    </div>);
  }
}

class ShowCards extends React.Component {
    static propTypes={
        cards:PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }  

    render() {
        var nextcards = this.props.cards.map((card, i) => {
            var m = templates[i];
            var lowerName = m.name.toLowerCase();
            return (<Col key={lowerName} sm={6} lg={3} xl={4} className={"d-flex align-items-stretch "}>
                {card}
            </Col>);
        });
        return nextcards;
    }
}

class OneCard extends React.Component {
  static propTypes={
    model:PropTypes.object.isRequired,
    onClick:PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state={
      model: this.props.model,
    }
    this.cardClick = this.cardClick.bind(this);
  }

  cardClick(link) {
      window.location.href = link;
  }

  render() {
    return (<div className="rounded p-2 fly card col-sm-12" onClick={this.cardClick.bind(this, this.props.model.link)} >
      <div className="m-1">
        <h2>{this.props.model.name}</h2>
      </div>
      <hr/>
      <div className="m-1">
        {this.props.model.descripstion}
      </div>
    </div>);
  }
}

export default Started;
