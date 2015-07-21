import React from "react";
import "./style.scss"

import {Router, Route, Link} from "react-router";
import HashHistory from 'react-router/lib/HashHistory'


import App from "./App.jsx";
import About from "./About.jsx";

import experiments from "./experiments.js";

console.log(experiments);


let childRoutes = experiments.map((obj) => ({
    path: obj.path,
    component: obj.component
})).concat([
    {
        path: 'about',
        component: About
    }
]);

React.render((
    <Router history={new HashHistory()}>
        <Route path="/" component={App} childRoutes={childRoutes}/>
    </Router>
), document.body);
