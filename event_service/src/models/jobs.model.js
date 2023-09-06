const mongoose = require("mongoose");
const configs = require('../configs');

const JobsSchema = new mongoose.Schema(
    {
        vacuumId: {
            type: String,
            default: null,
            required: true
        },
        priority: {
            type: Boolean,
            default: false,
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
            default: configs.jobStatus.TO_DO,
            required: true
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Jobs", JobsSchema);
