import React, {PropTypes} from 'react';
import {branch} from "baobab-react/mixins";

import util from "../../shared/util.js"
import LiveButton from "../../shared/LiveButton.jsx";

//TODO: clean up Audio Context
let audioCtx = new AudioContext();

export default React.createClass({
    mixins: [branch],
    cursors: {
        playing: ["playing"],
        samplerate: ["samplerate"],
        duration: ["duration"],
        amp: ["amp"],
        freq: ["freq"],
        phase: ["phase"],
    },
    componentDidMount() {
        this.updatePlay();
    },
    componentDidUpdate() {
        this.updatePlay();
    },
    shouldComponentUpdate(nextProps, nextState) {
        // only update playback on sweeprate changes
        return (nextState.playing !== this.state.playing);
    },
    _play() {
        let {samplerate, duration, amp, freq, phase, dc} = this.state;

        // we upsample if samplerate is < 4000Hz, bc webaudio api doesn't work below 4000Hz
        let upsampleBy = Math.ceil(4000/samplerate);
        let _samplerate = samplerate * upsampleBy;
        console.log(upsampleBy, _samplerate, samplerate);

        let sine = (i) => amp * Math.sin(
            2 * Math.PI * (i/samplerate) * freq + phase * Math.PI
        );

        let buflen = _samplerate * duration;

        let buffer = audioCtx.createBuffer(1, buflen, _samplerate);
        let nowBuffering = buffer.getChannelData(0);
        for (let i = 0; i < buflen; i += upsampleBy) {
            nowBuffering[i] = sine(i);
            for (let j = 1; j < upsampleBy; j++) {
                nowBuffering[i + j] = 0;
            }
        }
        let source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();
        setTimeout(function() {
            this.cursors.playing.set(false);
            this.context.tree.commit();
        }.bind(this), duration);
    },
    updatePlay() {
        if (!this.state.playing) {
            window.clearInterval(this.state.clearInterval);
        } else {
            this._play();
        }
    },
    render() {
        return (
            <div>
                <span> Play: </span>
                <LiveButton cursor={["playing"]}
                            on={<button>{"\u25FC"}</button>}
                            off={<button>{"\u25B6"}</button>}/>
            </div>

        )
    }
});
