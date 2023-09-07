const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { helloWorld, calculateJobPriority } = require("../controllers");

/** Validators */
const { calculateJobPriorityValidation } = require("../validator");

/** Routes */
router.get('/', helloWorld);
router.post('/', validator.body(calculateJobPriorityValidation), calculateJobPriority);

module.exports = router;
