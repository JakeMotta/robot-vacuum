const joi = require("joi");

module.exports.testValidation = joi.object({
    vacuumId: joi.string().trim().required().error(new Error("`vacuumId` is required!")), // ID of the vacuum that had the requested job
    priority: joi.boolean().required(),
    instructions: joi.array().items(
        joi.array().items(joi.number().required()).required()
    ).required() // Input instructions for the vacuum
});
