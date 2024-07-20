const express = require("express");
const router = express.Router();

const { createProduct } = require("../controllers/product");

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

router.put("/createProduct/:id", authSeller, createProduct);

module.exports = router;
