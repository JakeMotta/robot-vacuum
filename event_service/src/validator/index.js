/** NPM packages */
const joi = require("joi");

module.exports.testValidation = joi.object({
    mom: joi.string().trim(),
});
