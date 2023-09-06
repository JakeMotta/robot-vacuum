/** NPM packages */
const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { helloWorld, test } = require("../controllers");

/**  Middlewares */
// const { apiValidation } = require("../middlewares/authorization");

/** Validators */
const { testValidation } = require("../validator");

/** Routes */
router.get('/', helloWorld);
router.post('/test', validator.body(testValidation), test);

module.exports = router;
