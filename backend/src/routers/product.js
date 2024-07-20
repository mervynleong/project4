const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProductByID,
  deleteProductByID,
  getAllProducts,
} = require("../controllers/product");

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

const { checkErrors } = require("../validators/checkErrors");
const {
  validateIdInParam,
  validateProductData,
} = require("../validators/product");

router.put(
  "/createProduct/:id",
  validateIdInParam,
  validateProductData,
  checkErrors,
  authSeller,
  createProduct
);
router.patch(
  "/updateProduct/:id",
  validateIdInParam,
  validateProductData,
  checkErrors,
  authSeller,
  updateProductByID
);
router.delete(
  "/delete/:id",
  validateIdInParam,
  checkErrors,
  authSeller,
  deleteProductByID
);
router.get("/allProducts", authGeneral, getAllProducts);

module.exports = router;
