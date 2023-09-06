const mongoose = require("mongoose");
const configs = require('../configs');

const VacuumSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["BUSY", "IDLE"],
            default: configs.vacuumStatus.IDLE,
        },
        currentRoom: {
            type: Number,
            default: 1
        },
        targetRoom: {
            type: Number,
            default: null
        },
        jobs: {
            type: Array,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Vacuum", VacuumSchema);
