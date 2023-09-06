const mongoose = require("mongoose");

const JobsSchema = new mongoose.Schema(
    {
        vacuumId: {
            type: String,
            default: null,
        },
        priority: {
            type: Boolean,
            default: false,
        },
        instructions: {
            type: [[]],
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Jobs", JobsSchema);
