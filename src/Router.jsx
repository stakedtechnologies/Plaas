import React from 'react';
import App from './App';
import About from './About';
import Started from './Started';
import CreateCash from './CreateCash'
import Deploy from './Deploy';
import Console from './Console';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Route } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import DefaultManager from './ExternalManager';

class Router extends React.Component {
    constructor(props) {
      super(props);
      const { cookies } = props;      
      console.log('cookies:', cookies);
      DefaultManager.init(props);
    }

    render() {
        return(<BrowserRouter>
            <div>
                <Header />
                <Route exact path="/" component={App} />
                <Route path="/started" component={Started} />
                <Route path="/create/cash" component={CreateCash} />
                <Route path="/deploy" component={Deploy} />
                <Route path="/console/:plappname" component={Console} /> 
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </BrowserRouter>
        )
    }
}

export default withCookies(Router);