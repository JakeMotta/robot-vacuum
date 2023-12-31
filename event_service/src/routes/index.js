const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { getJobs, createJob, getPriorityRooms, setPriorityRooms } = require("../controllers");

/** Validators */
const { createJobValidation, priorityRoomsValidation } = require("../validator");

/** Routes */
router.get('/jobs/:vacuumId', getJobs);
router.post('/jobs/:vacuumId', validator.body(createJobValidation), createJob);

router.get('/priority/:vacuumId', getPriorityRooms);
router.post('/priority/:vacuumId', validator.body(priorityRoomsValidation), setPriorityRooms);


module.exports = router;
