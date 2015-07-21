import React, {propTypes} from "react";
import Nav from "./Nav.jsx";

let App = React.createClass({
    render() {
        return (
            <div id="App">
                <Nav/>
                {this.props.children}
            </div>
        )
    }
});

export default App;
