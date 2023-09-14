const mongoose = require("mongoose");
const constants = require('../shared/constants');

const JobsSchema = new mongoose.Schema(
    {
        vacuumId: {
            type: String,
            default: null,
            required: true
        },
        instructions: {
            type: [[]],
            default: null,
            required: true
        },
        status: {
            type: String,
            enum: ["TO_DO", "IN_PROGRESS", "DONE"],
            default: constants.jobStatus.TO_DO,
            required: true
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Jobs", JobsSchema);
