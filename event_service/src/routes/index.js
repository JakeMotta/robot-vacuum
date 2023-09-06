/** NPM packages */
const express = require("express");
const router = express.Router();
// const validator = require("express-joi-validation").createValidator({ passError: true });
const validator = require('express-joi-validation').createValidator({})

/** Controllers */
const { helloWorld, createJob } = require("../controllers");

/** Validators */
const { testValidation } = require("../validator");

/** Routes */
router.get('/', helloWorld);
router.post('/job', validator.body(testValidation), createJob);

module.exports = router;
