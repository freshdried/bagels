import React, {PropTypes} from "react";
import classNames from "classnames";
import {branch} from "baobab-react/mixins";

import util from "./util";

export default React.createClass({
    mixins: [branch],
    statics: {
        acceptFloat(e, resolve, reject) {
            let val = util.parseFloatStrict(e.target.value);
            if (isNaN(val)) reject(e.target.value);
            else resolve(val);
        }
    },
    propTypes: {
        cursor: PropTypes.any.isRequired,
        onChange: PropTypes.func,
        inputProps: PropTypes.object,
    },
    getDefaultProps() {
        return {
            onChange: (e, res) => res(e),
        }
    },
    cursors: function(props, context){
        return {
            value: props.cursor
        }
    },
    getInitialState() {
        return {tempVal: null}
    },
    onChange(e) {
        let resolve = function(newVal) {
            this.setState({tempVal: null});
            this.cursors.value.set(newVal);
            this.context.tree.commit();
        }.bind(this);

        let reject = function(tempVal) {
            this.setState({tempVal: tempVal});
        }.bind(this);

        this.props.onChange(e, resolve, reject);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.value !== this.state.value) ||
            (nextState.tempVal !== this.state.tempVal);
    },
    render() {
        let value, showRefresh, activityClass;

        if (this.state.tempVal === null) {
            value = this.state.value;
            activityClass = "active"
            showRefresh = false;
        }else {
            value = this.state.tempVal;
            activityClass = "inactive"
            showRefresh = true;
        }
        let refresh = (<div className="refresh" onClick={() => this.setState({tempVal: null})}>
            {"\u262f"}
        </div>);
        return (<span className={classNames("input", activityClass)}> 
            <input {...this.props.inputProps} onChange={this.onChange} value={value}/>
            {showRefresh ? refresh : null}
        </span>)
    }
});
