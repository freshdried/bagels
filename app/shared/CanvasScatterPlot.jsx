import React, {PropTypes} from "react";
import util from "./util";


export default React.createClass({
    propTypes: {
        data: PropTypes.array.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        xlim: PropTypes.arrayOf(PropTypes.number), //double
        ylim: PropTypes.arrayOf(PropTypes.number),
        title: PropTypes.element,
        xlabel: PropTypes.element,
        ylabel: PropTypes.element,
        xticks: PropTypes.number,
        xminorticks: PropTypes.number,
        yticks: PropTypes.number,
        yminorticks: PropTypes.number,
        fullscreen: PropTypes.bool,
        background: PropTypes.string,
        showaxes: PropTypes.bool,
        showgrid: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            width: 500,
            height: 500,
            xlim: [-1, 1],
            ylim: [-1, 1],
            title: null,
            xlabel: null,
            ylabel: null,
            xticks: null,
            xminorticks: null,
            yticks: null,
            yminorticks: null,
            fullscreen: false,
            background: "#ffffff",
            showaxes: false,
            showgrid: false,
        }
    },
    getInitialState() {
        return {
            width: this.props.fullscreen ? window.innerWidth : this.props.width,
            height: this.props.fullscreen ? window.innerHeight : this.props.height
        }
    },
    handleResize(e) {
        console.log("handling resize");
        let newState = {
            width: this.props.fullscreen ? window.innerWidth : this.props.width,
            height: this.props.fullscreen ? window.innerHeight : this.props.height
        }
        this.setState(newState);
    },
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.redraw();
    },
    componentDidUpdate() {
        this.redraw();
    },
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    redraw() {
        const ctx = this.getDOMNode().getContext("2d");

        let {
            data,
            xlim,
            ylim,
            fullscreen,
            showaxes,
            background,
        } = this.props;

        let {width, height} = this.state;


        function drawPoint(x, y, size) {
            x = Math.round(x);
            y = Math.round(y);
            size = size || 1;
            ctx.fillRect(x, y, size, size);
        }

        let xscale = util.linlin(xlim[0], xlim[1], 0, width);
        let yscale = util.linlin(ylim[0], ylim[1], height, 0);

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < data.length; i++) {
            let {points, color, size} = data[i];
            ctx.fillStyle = color || "black";

            for (let j = 0; j < points.length; j++) {
                let point = points[j];
                drawPoint(xscale(point[0]), yscale(point[1]), size);
            }
        }

        if (showaxes) {
            //x-axis
            ctx.beginPath();
            ctx.moveTo(0, yscale(0));
            ctx.lineTo(width, yscale(0));
            ctx.strokeStyle = "black";
            ctx.stroke();

            //y-axis
            ctx.beginPath();
            ctx.moveTo(xscale(0), 0);
            ctx.lineTo(xscale(0), height);
            ctx.strokeStyle = "black";
            ctx.stroke();
        }

    },
    render() {
        return (
            <canvas width={this.state.width} height={this.state.height}></canvas>
        )
    }
})
