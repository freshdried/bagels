import React, {PropTypes} from 'react';
import {branch} from "baobab-react/mixins";

import LiveInput, {acceptFloat} from "../../shared/LiveInput.jsx";
import LiveButton from "../../shared/LiveButton.jsx";

import {path} from "./config.js";

export default React.createClass({
    mixins: [branch],
    cursors: {
        sweeprate: [path, "sweeprate"],
        sweeping: [path, "sweeping"],
        freq: [path, "freq"],
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
        return (nextState.sweeprate !== this.state.sweeprate)
            || (nextState.sweeping !== this.state.sweeping);
    },
    _sweepNext() {
        this.cursors.freq.set(this.state.freq + this.state.sweeprate);
        /*         this.context.tree.commit(); */
    },
    updateSweep() {
        let {sweeping, sweeprate} = this.state;
        if (sweeping && sweeprate !== 0) {
            window.clearInterval(this.state.sweepInterval); //clear old interval
            this.setState({
                sweepInterval: window.setInterval(this._sweepNext, 17)
            });
        } else {
            window.clearInterval(this.state.sweepInterval); //clear old interval
        }
    },
    componentWillUnmount() {
        window.clearInterval(this.state.sweepInterval);
    },
    render() {
        return (
            <div>
                <span> Sweep: </span>
                <LiveInput cursor={[path, "sweeprate"]}
                           inputProps={{type: "number", min: -1, max: 1, step: 0.001}}
                           onChange={acceptFloat} />
                <LiveButton cursor={[path, "sweeping"]}
                            on={<button>{"\u25FC"}</button>}
                            off={<button>{"\u25B6"}</button>}/>
            </div>
        )
    }
});
