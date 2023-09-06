const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { helloWorld, createJob } = require("../controllers");

/** Validators */
const { createJobValidation } = require("../validator");

/** Routes */
router.get('/', helloWorld);
router.post('/job', validator.body(createJobValidation), createJob);

module.exports = router;
