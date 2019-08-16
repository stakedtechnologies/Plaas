import React from 'react';
import App from './App';
import About from './About';
import Started from './Started';
import Header from './Header';
import Footer from './Footer';
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
                <Route path="/started" component={Started} />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </BrowserRouter>
        )
    }
}

export default Router;