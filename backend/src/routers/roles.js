const express = require("express");
const router = express.Router();
const { getTypes } = require("../controllers/roles");

// router.get("/", getRoles);
// router.get("/seed", seedRoles);
router.get("/", getTypes);

module.exports = router;
