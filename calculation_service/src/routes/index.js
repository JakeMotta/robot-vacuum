const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });

/** Controllers */
const { calculateRoomOrder } = require("../controllers");

/** Validators */
const { calculateRoomOrderValidation } = require("../validator");

/** Routes */
router.post('/', validator.body(calculateRoomOrderValidation), calculateRoomOrder);

module.exports = router;
