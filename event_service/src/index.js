require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const configs = require('./configs');
const helper = require("../../shared/utils")(configs);
const dependencies = require("./configs/dependencies")(app, express, configs);

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
dependencies.mongoose.connect(configs.dbUrl, { useNewUrlParser: true });
const db = dependencies.mongoose.connection;
dependencies.mongoose.Promise = global.Promise;

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
const eventsRouter = require("./routes");

/** Routes **/
app.use("/events", eventsRouter);

// Error-handling middleware
/** Handler for 404 - Resource Not Found */
app.use((req, res, next) => {
    res.status(404).send({
        statusCode: 404,
        error: true,
        message: "Error",
        data: {},
    });
});

/** Handler for Error 500 and 400 */
app.use((error, req, res, next) => {
    const response = {
        statusCode: 500,
        error: true,
        message: error?.message,
        data: {},
    };

    if (error && error.error && error.error.isJoi && error.error.details && Array.isArray(error.error.details) && error.error.details.length) {
        response.message = error.error.details.map((e) => e.message);
        response.message = response.message.join(". ");
        response.statusCode = 400;
    }
    res.status(response.statusCode).send(response);
});
