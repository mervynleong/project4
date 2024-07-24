const express = require("express");
const router = express.Router();

// const {
//   createProduct,
//   updateProductByID,
//   deleteProductByID,
//   getAllProducts,
//   createProductPG,
// } = require("../controllers/product");

const {
  createProductPG,
  buyItemPG,
  deleteItemPG,
  updateItemPG,
  getItemByIDPG,
  getAllItemPG,
} = require("../controllers/product");

const {
  authBuyer,
  authGeneral,
  authSeller,
  authAdminAndSeller,
} = require("../middleware/auth");

const { checkErrors } = require("../validators/checkErrors");
// const {
//   validateIdInParam,
//   validateProductData,
// } = require("../validators/product");

// router.put(
//   "/createProduct/:id",
//   validateIdInParam,
//   validateProductData,
//   checkErrors,
//   authSeller,
//   createProduct
// );
// router.patch(
//   "/updateProduct/:id",
//   validateIdInParam,
//   validateProductData,
//   checkErrors,
//   authSeller,
//   updateProductByID
// );
// router.delete(
//   "/delete/:id",
//   validateIdInParam,
//   checkErrors,
//   authSeller,
//   deleteProductByID
// );
// router.get("/allProducts", authGeneral, getAllProducts);

router.put("/:seller_username", authSeller, createProductPG);
router.patch("/buyItem/:item_uuid", authBuyer, buyItemPG);
router.delete("/:item_uuid", authAdminAndSeller, deleteItemPG);
router.patch("/updateItem/:item_uuid", authSeller, updateItemPG);
router.get("/item/:item_uuid", authGeneral, getItemByIDPG);
router.get("/all", authGeneral, getAllItemPG);

module.exports = router;
