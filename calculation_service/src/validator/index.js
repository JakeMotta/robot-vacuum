const joi = require("joi");

module.exports.calculateJobPriorityValidation = joi.object({
    instructions: joi.array().required().error(new Error("`job` array is required!")), // Jobs for the vacuum
    currentRoom: joi.number().required(),
    priorityRooms: joi.array(),
});
