import React, {PropTypes} from 'react';
import util from "../../shared/util.js";

import LiveInput, {acceptFloat} from "../../shared/LiveInput.jsx";

import WaveVis from "./WaveVis.jsx";
import Play from "./Play.jsx";
import Sweep from "./Sweep.jsx";

import tree from "../../tree.js";

import config, {path} from "./config.js";

const default_settings = {
    samplerate: 16,
    duration: 1,
    amp: 0.5,
    freq: 1,
    phase: 0.5,
    opacity: 1,
    size: 10,
    repaint_opacity: 0.2,
    sweeprate: 0.01,
    sweeping: true,
    playing: false
}

const Widget = React.createClass({
    componentWillMount() {
        if (!tree.get(path)) {
            console.log("setting keys");
            tree.set([path], default_settings);
        }
    },
    render() {
        console.log("rendering");
        return (
            <div className="widget">
                <WaveVis/>
                <div className="widget-UI">
                    <div>
                        <div>
                            <span> Amplitude: </span>
                            <LiveInput cursor={[path, "amp"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}/>
                            <LiveInput cursor={[path, "amp"]}
                                       inputProps={{type: "number", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                        <div>
                            <span> Frequency: </span>
                            <LiveInput cursor={[path, "freq"]}
                                       inputProps={{type: "range", min: 1, max: 22050, step: 1}}
                                       onChange={acceptFloat} />
                            <LiveInput cursor={[path, "freq"]}
                                       inputProps={{type: "number", min: 1, max: 22050, step: 1}}
                                       onChange={acceptFloat}/>
                            <span> Hz</span>
                        </div>
                        <div>
                            <span> Phase: </span>
                            <LiveInput cursor={[path, "phase"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                        <div>
                            <span> Sampling Rate: </span>
                            <LiveInput cursor={[path, "samplerate"]}
                                       inputProps={{type: "number", min: 0, max: 441000, step: 1}}
                                       onChange={acceptFloat}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div> Opacity: </div>
                            <LiveInput cursor={[path,"opacity"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}/>
                        </div>
                        <div>
                            <span> Size: </span>
                            <LiveInput cursor={[path, "size"]}
                                       inputProps={{type: "number", min: 1, max: 50, step: 1}}
                                       onChange={acceptFloat}/>
                            <span>px</span>
                        </div>
                        <div>
                            <div> Repaint Opacity: </div>
                            <LiveInput cursor={[path, "repaint_opacity"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.005}}
                                       onChange={acceptFloat}/>
                            <LiveInput cursor={[path, "repaint_opacity"]}
                                       inputProps={{type: "number", min: 0, max: 1, step: 0.005}}
                                       onChange={acceptFloat}/>
                        </div>
                    </div>
                    <div>
                        <Sweep/>
                        <Play/>
                    </div>
                </div>
            </div>
        )
    }
});

config.component = Widget;
export default config;
