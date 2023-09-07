const mongoose = require("mongoose");

const PriorityRoomsSchema = new mongoose.Schema(
    {
        vacuumId: {
            type: String,
            default: null,
            required: true
        },
        priorityRooms: {
            type: [],
            default: [],
            required: true
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("PriorityRooms", PriorityRoomsSchema);
