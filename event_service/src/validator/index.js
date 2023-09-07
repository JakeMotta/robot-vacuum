const joi = require("joi");

module.exports.createJobValidation = joi.object({
    instructions: joi.array().items(
        joi.array().items(joi.number().required()).required()
    ).required().error(new Error("`instructions` are required!")) // Input instructions for the vacuum
});

module.exports.priorityRoomsValidation = joi.object({
    priorityRooms: joi.array().required().error(new Error("`priorityRooms` array is required!")), // ID of the vacuum that had the requested job
});
