const express = require("express");
const router = express.Router();
// const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { createVacuum, getVacuum } = require("../controllers");

/** Validators */
// const { getVacuumValidation } = require("../validator");

/** Routes */
router.get('/:vacuumId', getVacuum);
router.post('/', createVacuum);

module.exports = router;
