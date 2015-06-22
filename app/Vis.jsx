import React, {PropTypes} from "react";
import assert from "assert";

import {branch} from "baobab-react/mixins";
import {parseFloatStrict, linlin, range, p2c} from "./util.js";
import LiveInput from "./LiveInput.jsx";


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
        
        let onChange = function(e, resolve, reject) {
            let val = parseFloatStrict(e.target.value);
            if (isNaN(val)) reject(e.target.value);
            else resolve(val);
        }



        return (<div id="Vis">
            <div className="params">
                <div>
                    <h3> params </h3>
                    <LiveInput cursor={["circle", "points"]} inputProps={{type: "number", min: 2, max: 200}} onChange={onChange} label="points:" key="points"/>
                    <LiveInput cursor={["circle", "radius"]} inputProps={{type: "number", min: 0, max: 1, step: 0.01}} onChange={onChange} label="radius:" key="radius"/>
                    <LiveInput cursor={["circle", "phase"]} inputProps={{type: "number", min: 0, max: Math.PI*2, step: 0.1}} onChange={onChange} label="phase:" key="phase"/>
                </div>
                <div>
                    <h3> look how they're in sync</h3>
                    <LiveInput cursor={["circle", "points"]} inputProps={{type: "number", min: 2, max: 200}} onChange={onChange} label="points:" key="points"/>
                    <LiveInput cursor={["circle", "radius"]} inputProps={{type: "number", min: 0, max: 1, step: 0.01}} onChange={onChange} label="radius:" key="radius"/>
                    <LiveInput cursor={["circle", "phase"]} inputProps={{type: "number", min: 0, max: Math.PI*2, step: 0.1}} onChange={onChange} label="phase:" key="phase"/>
                </div>
            </div>
            <Plot {...circleProps} id="Plot"/>
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
