import React, {PropTypes} from "react";
import {branch} from "baobab-react/mixins";

export default React.createClass({
    mixins: [branch],
    propTypes: {
        cursor: PropTypes.any.isRequired,
        on: PropTypes.element,
        off: PropTypes.element
    },
    getDefaultProps() {
        return {
            on: (<button> on </button>),
            off: (<button> off</button>),
        }
    },
    cursors: function(props, context) {
        return {
            value: props.cursor
        }
    },
    render() {
        let currentValue= this.state.value;
        let handleClick = function() {
            this.cursors.value.set(!currentValue);
            this.context.tree.commit();
        }.bind(this);
        return (
            <span onClick={handleClick}>
                {currentValue ? this.props.on : this.props.off}
            </span>
        )
    }

});
