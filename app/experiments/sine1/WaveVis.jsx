import React, {PropTypes} from 'react';
import {branch} from "baobab-react/mixins";

import util from "../../shared/util.js"
import CanvasScatterPlot from "../../shared/CanvasScatterPlot.jsx"

import {path} from "./config.js";

export default React.createClass({
    mixins: [branch],
    cursors: {
        samplerate: [path, "samplerate"],
        duration: [path, "duration"],
        amp: [path, "amp"],
        freq: [path, "freq"],
        phase: [path, "phase"],
        opacity: [path, "opacity"],
        size: [path, "size"],
        repaint_opacity: [path, "repaint_opacity"],
    },
    render() {
        if (this.state.samplerate === undefined) return (<div className="vis"> Loading... </div>)
        let {
            samplerate, duration, amp, freq, phase,
            opacity, size, repaint_opacity 
        } = this.state;

        let frames = samplerate * duration;
        let x = (i) => i/samplerate;
        let y = (i) => amp * Math.sin(
            2 * Math.PI * (i/samplerate) * freq + phase * Math.PI
        );


        let data  = [
            {
                points: util.range(frames).map((i) => [x(i), y(i)]),
                size: size,
                color: `rgba(0,0,0,${opacity})`
            }
        ]
        let background = `rgba(255, 255, 255,${repaint_opacity})`;

        
        return (
            <div className="vis">
            <CanvasScatterPlot xlim={[0, this.state.duration]}
                         ylim={[-1, 1]}
                         width={1000}
                         height={500}
                         background={background}
                         fullscreen={true}
                         showaxes={false}
                         data={data}/>
            </div>
        )
    }
});
