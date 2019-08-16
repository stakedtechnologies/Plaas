import React from 'react';
import App from './App';
import About from './About';
import Started from './Started';
import CreateCash from './CreateCash'
import Deploy from './Deploy';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Route } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import MockManager from './MockExternalManager';

class Router extends React.Component {
    constructor(props) {
      super(props);
      const { cookies } = props;      
      console.log('cookies:', cookies);
      MockManager.init(props);
    }

    render() {
        return(<BrowserRouter>
            <div>
                <Header />
                <Route exact path="/" component={App} />
                <Route path="/started" component={Started} />
                <Route path="/create/cash" component={CreateCash} />
                <Route path="/deploy" component={Deploy} />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </BrowserRouter>
        )
    }
}

export default withCookies(Router);