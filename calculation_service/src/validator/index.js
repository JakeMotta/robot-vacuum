const joi = require("joi");

module.exports.calculateJobPriorityValidation = joi.object({
    instructions: joi.array().required().error(new Error("`instructions` array is required!")), // Jobs for the vacuum
    currentRoom: joi.number().required().error(new Error("`currentRoom` array is required!")),
    priorityRooms: joi.array(),
});
