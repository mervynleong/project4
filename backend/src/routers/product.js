const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProductByID,
  deleteProductByID,
} = require("../controllers/product");

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

router.put("/createProduct/:id", authSeller, createProduct);
router.patch("/updateProduct/:id", authSeller, updateProductByID);
router.delete("/delete/:id", authSeller, deleteProductByID);

module.exports = router;
