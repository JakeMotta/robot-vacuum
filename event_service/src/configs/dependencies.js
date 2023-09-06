module.exports = function (app, express, config) {
    const joi = require("joi");
    const mongoose = require("mongoose");

    return {
        app: app,
        express: express,
        config: config,
        joi: joi,
        mongoose: mongoose,
        // https: require("https"),
    };
};
