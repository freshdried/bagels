import React, {PropTypes} from "react";
import {Link} from "react-router";
import experiments from "./experiments.js";

let Nav = React.createClass({
    render() {
        return (
            <header id="Nav">
                <Link to="/"><h1>playground</h1></Link>
                {experiments.map(
                    (_) => <Link key={_.path} to={_.path}>{_.name}</Link>
                 )}
                <Link to="/about">about</Link>
            </header>
        )
    }
});

export default Nav

