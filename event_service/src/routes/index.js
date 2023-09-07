const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { helloWorld, getJobsById, createJob, getPriorityRoomsById, setPriorityRooms } = require("../controllers");

/** Validators */
const { createJobValidation, priorityRoomsValidation } = require("../validator");

/** Routes */
router.get('/', helloWorld);

router.get('/jobs/:vacuumId', getJobsById);
router.post('/jobs/:vacuumId', validator.body(createJobValidation), createJob);

router.get('/priority/:vacuumId', getPriorityRoomsById);
router.post('/priority/:vacuumId', validator.body(priorityRoomsValidation), setPriorityRooms);


module.exports = router;
