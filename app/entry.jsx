import React from "react";
import {root} from "baobab-react/mixins";
import "./style.scss"
import "./linkreset.css"

import {Router, Route, Link} from "react-router";
import HashHistory from 'react-router/lib/HashHistory'


import App from "./App.jsx";
import About from "./About.jsx";

import tree from "./tree.js";

import experiments from "./experiments.js";


let childRoutes = experiments.map((obj) => ({
    path: obj.path,
    component: obj.component
})).concat([
    {
        path: 'about',
        component: About
    }
]);

let RootContainer = React.createClass({
    render() {
        return (<Root tree={tree} {...this.props}/>)
    }
});

let Root = React.createClass({
    mixins: [root],
    render() {
        return (
            <Router history={new HashHistory()}>
                <Route path="/" component={App} childRoutes={childRoutes}/>
            </Router>
        )
    }
})


React.render((
    <RootContainer/>
), document.body);
