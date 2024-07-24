const express = require("express");
const router = express.Router();
const { getTypes, seedTypes } = require("../controllers/roles");

// router.get("/", getRoles);
// router.get("/seed", seedRoles);
router.get("/types", getTypes);
router.get("/seed", seedTypes);

module.exports = router;
