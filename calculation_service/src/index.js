require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const configs = require('./configs');
const mongoose = require("mongoose");
const messages = require("../../shared/messages");
const helper = require("../../shared/utils")(configs);

app.get('/', (req, res) => {
    res.send(`Hello from ${configs.serviceName} - ${configs.PORT}`);
});

app.listen(configs.PORT, () => {
    helper.consoleAtServerStart(configs.serviceName, configs.PORT);
});

app.use(helmet());
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5000mb" }));

/** ----------- DATABASE START ----------- **/
mongoose.connect(configs.dbUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", function () {
    console.error.bind(console, "Error in db connection!");
    process.exit();
});

db.once("open", function () {
    console.log("Successfully connected to db!");
});
/** ----------- DATABASE END ----------- **/

/** Models **/
app.models = require("./models");

/** Router Declaration **/
const router = require("./routes");

/** Routes **/
app.use("/calculate", router);

/** Error Handler */
app.use((error, req, res, next) => {
    return helper.sendResponse(res, messages.FAILURE, error?.error?.message , configs.serviceName);
});
