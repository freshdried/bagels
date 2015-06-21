import React, {PropTypes} from "react"
import {Link} from "react-router"

let Nav = React.createClass({
    render() {
        return (<header id="Nav">
            <h4>bagels</h4>
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
        </header>)
    }
});

export default Nav

