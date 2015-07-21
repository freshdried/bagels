import React from "react";

export default React.createClass({
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: require("./about.md")}}/>
        )

    }

});
