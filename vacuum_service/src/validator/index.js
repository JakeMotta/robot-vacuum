const joi = require("joi");

module.exports.getVacuumByIdValidation = joi.object({
    vacuumId: joi.string().trim().required().error(new Error("`vacuumId` is required!")), // ID of the vacuum that had the requested job
});
