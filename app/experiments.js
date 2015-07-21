const req = require.context("./experiments", true, /App.jsx?/g);
export default req.keys().map((key) => req(key));
