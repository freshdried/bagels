import React, {PropTypes} from 'react';
import {root} from "baobab-react/mixins";

import tree from "./tree.js";

import util from "../../shared/util.js";
import LiveInput, {acceptFloat} from "../../shared/LiveInput.jsx";

import WaveVis from "./WaveVis.jsx";
import Play from "./Play.jsx";
import Sweep from "./Sweep.jsx";

const SineWidget = React.createClass({
    mixins: [root],
    render() {
        return (
            <div className="widget">
                <WaveVis/>
                <div className="widget-UI">
                    <div>
                        <div>
                            <span> Amplitude: </span>
                            <LiveInput cursor={["amp"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}/>
                            <LiveInput cursor={["amp"]}
                                       inputProps={{type: "number", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                        <div>
                            <span> Frequency: </span>
                            <LiveInput cursor={["freq"]}
                                       inputProps={{type: "number", min: 1, max: 4000, step: 0.01}}
                                       onChange={acceptFloat}/>
                            <span> Hz</span>
                        </div>
                        <div>
                            <span> Phase: </span>
                            <LiveInput cursor={["phase"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                        <div>
                            <span> Sampling Rate: </span>
                            <LiveInput cursor={["samplerate"]}
                                       inputProps={{type: "number", min: 0, max: 441000, step: 1}}
                                       onChange={acceptFloat}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div> Opacity: </div>
                            <LiveInput cursor={["opacity"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                        <div>
                            <span> Size: </span>
                            <LiveInput cursor={["size"]}
                                       inputProps={{type: "number", min: 1, max: 50, step: 1}}
                                       onChange={acceptFloat}/>
                            <span>px</span>
                        </div>
                        <div>
                            <div> Repaint Opacity: </div>
                            <LiveInput cursor={["repaint_opacity"]}
                                       inputProps={{type: "range", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                    </div>
                    <div>
                        <Sweep/>
                        <Play/>
                    </div>
                    <div>
                        <div>
                            <span> DC Offset: </span>
                            <LiveInput cursor={["dc"]}
                                       inputProps={{type: "number", min: 0, max: 1, step: 0.01}}
                                       onChange={acceptFloat}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});




const SineWidgetContainer = React.createClass({
    render() {
        return (<SineWidget tree={tree}/>)
    }
});



export default {
    path: 'sine',
    name: "Sine",
    description: "Sampling a Sine Wave...",
    component: SineWidgetContainer
}
