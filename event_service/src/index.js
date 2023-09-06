const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const configs = require('./configs');
const helper = require("../../shared/utils")(configs);

app.get('/', (req, res) => {
    res.send(`Hello from ${configs.serviceName} - ${configs.PORT}`);
});

app.listen(configs.PORT, () => {
    helper.consoleAtServerStart(configs.serviceName, configs.PORT);
});

app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5000mb" }));

// Router Declaration
const eventsRouter = require("./routes");

// Routes
app.use("/events", eventsRouter);
