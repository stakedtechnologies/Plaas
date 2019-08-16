import React from 'react';
import App from './App';
import About from './About';
import Header from './Header';
import { BrowserRouter, Route } from "react-router-dom";

class Router extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(<BrowserRouter>
            <div>
                <Header />
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
            </div>
        </BrowserRouter>
        )
    }
}

export default Router;