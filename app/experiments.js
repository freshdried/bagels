const req = require.context("./experiments", true, /App.js?/g);
export default req.keys().map((key) => req(key));
