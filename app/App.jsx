import React, {propTypes} from "react";
import {root} from "baobab-react/mixins"

import Nav from "./Nav.jsx"
import Vis from "./Vis.jsx"


let App = React.createClass({
    mixins: [root],
    render() {
        console.log(this.props);
        return (<div id="App">
            {this.props.nav || <Nav/>}
            {this.props.main || <Vis/>}
        </div>)
    }
});







export default App;
