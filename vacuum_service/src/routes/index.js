const express = require("express");
const router = express.Router();
// const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { helloWorld, createVacuum, getVacuumById } = require("../controllers");

/** Validators */
// const { getVacuumByIdValidation } = require("../validator");

/** Routes */
router.get('/', helloWorld);
router.get('/:vacuumId', getVacuumById);
router.post('/', createVacuum);

module.exports = router;
