import React from "react";
import "./style.scss"

import {Router, Route, Link} from "react-router";
import HashHistory from 'react-router/lib/HashHistory'

import App from "./App.jsx";
import About from "./About.jsx";
import Nav from "./Nav.jsx";
import tree from "./tree.jsx"

let AppWrapper = React.createClass({
    render() {
        return <App tree={tree} {...this.props}/>
    }
})

React.render((
    <Router history={new HashHistory()}>
        <Route path="/" component={AppWrapper}>
            <Route path="about" components={{main: About, nav: Nav}}>
            </Route>
        </Route>
    </Router>
), document.body);

// React.render(<App/>, document.body);
