import React, {PropTypes} from 'react';
import {branch} from "baobab-react/mixins";

import LiveInput, {acceptFloat} from "../../shared/LiveInput.jsx";

export default React.createClass({
    mixins: [branch],
    cursors: {
        sweeprate: ["sweeprate"],
        freq: ["freq"],
    },
    getInitialState() {
        return {
            sweepInterval: null,
        }
    },
    componentDidMount() {
        this.updateSweep();
    },
    componentDidUpdate() {
        this.updateSweep();
    },
    shouldComponentUpdate(nextProps, nextState) {
        // only update playback on sweeprate changes
        return (nextState.sweeprate !== this.state.sweeprate);
    },
    _sweepNext() {
        this.cursors.freq.set(this.state.freq + this.state.sweeprate);
        /*         this.context.tree.commit(); */
    },
    updateSweep() {
        let sweeprate = this.state.sweeprate;
        let oldInterval = this.state.sweepInterval;

        if (oldInterval) window.clearInterval(oldInterval);
        if (sweeprate !== 0) {
            let newInterval = window.setInterval(this._sweepNext, 17); //60fps
            this.setState({sweepInterval: newInterval});
        }
    },
    render() {
        return (
            <div>
                <span> Sweep: </span>
                <LiveInput cursor={["sweeprate"]}
                           inputProps={{type: "number", min: -1, max: 1, step: 0.001}}
                           onChange={acceptFloat} />
                <button onClick={function() {
                                 let oldInterval = this.state.sweepinterval;
                                 if (oldInterval) window.clearInterval(oldInterval);
                                 this.cursors.sweeprate.set(0);
                                 this.context.tree.commit();
                                 }.bind(this)}>
                    {"\u25FC"}
                </button>
            </div>
        )
    }
});
