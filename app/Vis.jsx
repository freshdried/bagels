import React, {PropTypes} from "react";
import assert from "assert";

import {branch} from "baobab-react/mixins";
import {parseFloatStrict, linlin, range, p2c} from "./util.js";


let Vis = React.createClass({
    mixins: [branch],
    cursors: {
        points: ["circle", "points"],
        radius: ["circle", "radius"],
        phase: ["circle", "phase"]
    },
    render() {
        function genCircle(numPoints, r, phase) {
            return range(numPoints)
                .map(linlin(0, numPoints, 0, Math.PI * 2))
                .map((theta) => (theta + phase))
                .map((theta) => [r, theta])
                .map(p2c)
        }

        let circleProps = {
            width: 500,
            height: 500,
            points: genCircle(this.state.points, this.state.radius, this.state.phase)
        }
        



        return (<div id="Vis">
            <div className="params">
                <h3> params </h3>
                <Slider cursor={["circle", "points"]} start={0} end={12} label="points:" key="points"/>
                <Slider cursor={["circle", "radius"]} start={0} end={1} label="radius:" key="radius"/>
                <Slider cursor={["circle", "phase"]} start={0} end={Math.PI/2} label="phase:" key="phase"/>
            </div>
            <div className="params">
                <h3> just 'cuz </h3>
                <Slider cursor={["circle", "points"]} start={0} end={12} label="points:" key="points"/>
                <Slider cursor={["circle", "radius"]} start={0} end={1} label="radius:" key="radius"/>
                <Slider cursor={["circle", "phase"]} start={0} end={Math.PI/2} label="phase:" key="phase"/>
            </div>
            <Plot {...circleProps} id="Plot"/>
            <Debug {...circleProps} />
        </div>)
    }
});

//TODO; make into generic text input
//- custom checking
//- outside input overwriting
//- why is it updating everything?

let Slider = React.createClass({
    mixins: [branch],
    propTypes: {
        cursor: PropTypes.arrayOf(PropTypes.string).isRequired,
        start: PropTypes.number,
        end: PropTypes.number,
        label: PropTypes.any
    },
    cursors: function(props, context){
        console.log(props, context);
        return {
            value: props.cursor
        }
    },
    getInitialState() {
        return {tempVal: null}
    },
    onChange(e) {
        let newVal = parseFloatStrict(e.target.value);
        if (isNaN(newVal)) {
            console.log(JSON.stringify(e.target.value));
            this.setState({tempVal: e.target.value});
        }else {
            this.setState({tempVal: null});
            this.cursors.value.set(newVal);
            this.context.tree.commit();
        }
    },
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.value !== this.state.value) ||
            (nextState.tempVal !== this.state.tempVal);
    },
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps, nextState);
    },
    render() {
        let value, showRefresh, inputClass;

        if (this.state.tempVal === null) {
            value = this.state.value;
            inputClass = "active"
            showRefresh = false;
        }else {
            value = this.state.tempVal;
            inputClass = "inactive"
            showRefresh = true;
        }
        let refresh = (<div className="refresh" onClick={() => this.setState({tempVal: null})}>
            {"\u262f"}
        </div>)
        return (<div className="input">
            <div className="label"> {this.props.label} </div>
            <div className="box"> 
                <input className={inputClass} onChange={this.onChange}
                value={value}/>
                {showRefresh ? refresh : null}
            </div>
        </div>)
    }
});

let Plot = React.createClass({
    propTypes: {
        width: PropTypes.number,
        height: PropTypes.number,
    },
    renderPoint(arr, index) {
        let x = linlin(-1, 1, 0, this.props.width || 500)(arr[0])
        let y = linlin(1, -1, 0, this.props.height || 500)(arr[1])
        return (
            <circle key={index} cx={x} cy={y} r="5" fill="black"/>
        )
    },
    render() {
        return (<div>
            <svg
                className="plot"
                width={this.props.width || 500}
                height={this.props.height || 500}>
                <g>
                {this.props.points.map(this.renderPoint)}
                </g>
            </svg>
        </div>)
    }
});
let Debug = React.createClass({
    render() {
        return <pre>{JSON.stringify(this.props, null, 2)}</pre>
    }
});
//- parametric 3d plotter with streams / generators

export default Vis;
