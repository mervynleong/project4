const express = require("express");
const router = express.Router();
const { getTypes, seedTypes } = require("../controllers/roles");

router.get("/types", getTypes);
router.get("/seed", seedTypes);

module.exports = router;
