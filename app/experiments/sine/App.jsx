import React, {PropTypes} from 'react';
import {branch} from "baobab-react/mixins";


import util from "../../shared/util.js";
import LiveInput, {acceptFloat} from "../../shared/LiveInput.jsx";

import WaveVis from "./WaveVis.jsx";
import Play from "./Play.jsx";
import Sweep from "./Sweep.jsx";

import tree from "../../tree.js";


const default_settings = {
    samplerate: 1000,
    duration: 1,
    amp: 0.75,
    freq: 500,
    phase: 0.5,
    opacity: 1,
    size: 1,
    repaint_opacity: 0.01,
    sweeprate: 0,
    sweeping: false,
    playing: false
}



const SineWidget = React.createClass({
    componentWillMount() {
        if (!tree.get("sine")) {
            console.log("setting keys");
            tree.set(["sine"], default_settings);
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
                            <LiveInput cursor={["sine","amp"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}/>
                            <LiveInput cursor={["sine","amp"]}
                                       inputProps={{type: "number", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                        <div>
                            <span> Frequency: </span>
                            <LiveInput cursor={["sine","freq"]}
                                       inputProps={{type: "range", min: 1, max: 22050, step: 1}}
                                       onChange={acceptFloat} />
                            <LiveInput cursor={["sine","freq"]}
                                       inputProps={{type: "number", min: 1, max: 22050, step: 1}}
                                       onChange={acceptFloat}/>
                            <span> Hz</span>
                        </div>
                        <div>
                            <span> Phase: </span>
                            <LiveInput cursor={["sine","phase"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                        <div>
                            <span> Sampling Rate: </span>
                            <LiveInput cursor={["sine","samplerate"]}
                                       inputProps={{type: "number", min: 0, max: 441000, step: 1}}
                                       onChange={acceptFloat}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div> Opacity: </div>
                            <LiveInput cursor={["sine","opacity"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}/>
                        </div>
                        <div>
                            <span> Size: </span>
                            <LiveInput cursor={["sine","size"]}
                                       inputProps={{type: "number", min: 1, max: 50, step: 1}}
                                       onChange={acceptFloat}/>
                            <span>px</span>
                        </div>
                        <div>
                            <div> Repaint Opacity: </div>
                            <LiveInput cursor={["sine","repaint_opacity"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.005}}
                                       onChange={acceptFloat}/>
                            <LiveInput cursor={["sine","repaint_opacity"]}
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



export default {
    path: 'sine',
    name: "Sine",
    description: "Sampling a Sine Wave...",
    component: SineWidget
}
