export default {
    parseFloatStrict(value) {
        if (typeof value === "number") return value;
        if (typeof value !== "string") return NaN;
        if (value.length === 0) return NaN;

        if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
            .test(value))
            return Number(value)
        return NaN;
    },

    /**
     * linlin :: (a, b, c, d) -> (input -> output)
     *
     * maps linear range to linear range, from [a,b] to [c,d]
     */
    linlin(a, b, c, d) {
        return (input) => (input - a) * (d - c) / (b - a) + c
    },
    /**
     * range :: (length) -> [number]
     *
     * returns [0 ... length -1]
     *
     */
    range(length) {
        let points = [];
        for (let i = 0; i < length; i++) {
            points.push(i);
        }
        return points;
    },

    p2c(polarVec){
        let r = polarVec[0];
        let theta = polarVec[1];
        return [r*Math.cos(theta), r*Math.sin(theta)]
    },

    //TODO: figure out linexp
}
