const express = require("express");
const router = express.Router();
const { getRoles, seedRoles } = require("../controllers/roles");

router.get("/", getRoles);
router.get("/seed", seedRoles);

module.exports = router;
