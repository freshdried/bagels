import React, {PropTypes} from "react";
import classNames from "classnames";
import {branch} from "baobab-react/mixins";

let LiveInput = React.createClass({
    mixins: [branch],
    propTypes: {
        cursor: PropTypes.any.isRequired,
        onChange: PropTypes.func,
        label: PropTypes.any,
        inputProps: PropTypes.object,
    },
    cursors: function(props, context){
        return {
            value: props.cursor
        }
    },
    getInitialState() {
        return {tempVal: null}
    },
    _defaultOnChange(e, resolve, reject) {
        resolve(e);
    },
    onChange(e) {
        let resolve = function(newVal) {
            this.setState({tempVal: null});
            this.cursors.value.set(newVal);
            this.context.tree.commit();
        }.bind(this);

        let reject = function(tempVal) {
            console.log("rejected!", tempVal);
            this.setState({tempVal: tempVal});
        }.bind(this);
        if (this.props.onChange) 
            this.props.onChange(e, resolve, reject);
        else this._defaultOnChange(e, resolve, reject);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.value !== this.state.value) ||
            (nextState.tempVal !== this.state.tempVal);
    },
    render() {
        console.log(this.props.label);
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
        </div>)
        return (<div className={classNames("input", activityClass)}>
            <div className="label"> {this.props.label} </div>
            <div className="box"> 
                <input {...this.props.inputProps} onChange={this.onChange} value={value}/>
                {showRefresh ? refresh : null}
            </div>
        </div>)
    }
});
export default LiveInput
