const express = require("express");
const router = express.Router();
// const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { helloWorld, createVacuum, getVacuum } = require("../controllers");

/** Validators */
// const { getVacuumValidation } = require("../validator");

/** Routes */
router.get('/', helloWorld);
router.get('/:vacuumId', getVacuum);
router.post('/', createVacuum);

module.exports = router;
